"use strict";
const electron = require("electron");
const path$1 = require("path");
const utils = require("@electron-toolkit/utils");
const fs$1 = require("fs");
const crypto = require("crypto");
const axios$1 = require("axios");
const JSON5 = require("json5");
const Store = require("electron-store");
const stripComments = require("strip-comments");
const stream = require("stream");
const pinyinPro = require("pinyin-pro");
const electronUpdater = require("electron-updater");
const icon = path$1.join(__dirname, "../../resources/icon.png");
const jarRegex = /(?<=['"]?\s*spider\s*['"]?\s*:\s*['"]\s*(img\+)?)(https?:\/\/|\.\/)([^'"\s]+\/)?([^'"\s;?}]+)/g;
const linkRegex = /(?<!['"]\s*spider\s*['"]\s*:\s*['"])(?<=['"]\s*)(https?:\/\/|\.\/)(?:[^'"\s]+\/)?((?!tok)[^'"\s\/]+\.(?:json|js|py|jar|txt|m3u)(\?[^'"\s]+)?)(?=\s*['";])/g;
const wallpaperRegex = /(['"]wallpaper['"]\s*:\s*)(['"][^'"]*['"])/g;
const drpyRegex = /(import[^"']*["'])([^"']*\/)?([^"']*?\.(js|jsx|ts|tsx))/g;
const jsonerrRegex = /['"]\s*(\w+)\s*['"]\s*:\s*([\w\u4e00-\u9fa5\-]+)\s*['"]/g;
const tokenRegex = /(['"]\s*api\s*['"]\s*:\s*['"]\s*(csp_Paper|csp_YiSo|csp_PanSou|csp_UpYun|csp_Push|csp_Zhaozy|csp_Dovx|csp_WoGG|csp_PanSearch|csp_TuGou|csp_Upyunso|csp_AliPS|csp_Yiso|csp_PushAgent|csp_Gitcafe)\s*['"].+['"]\s*ext\s*['"]\s*:\s*)(['"][^'"]*['"])/g;
const regex = {
  jarRegex,
  linkRegex,
  wallpaperRegex,
  drpyRegex,
  jsonerrRegex,
  tokenRegex
};
const store$1 = new Store();
const desktopPath$1 = require("os").homedir() + "/Desktop";
const decryptAesBCB = async (encryptedData) => {
  const dataArr = encryptedData.split("");
  const prefixCode = Buffer.from("$#", "utf-8").toString("hex");
  const suffixCode = Buffer.from("#$", "utf-8").toString("hex");
  const pwdMix = dataArr.splice(0, encryptedData.indexOf(suffixCode) + 4).join("");
  const roundtimeInHax = dataArr.splice(dataArr.length - 26, 26).join("");
  const encryptedText = dataArr.join("");
  const pwdInHax = pwdMix.substring(
    prefixCode.length,
    pwdMix.length - suffixCode.length
  );
  const roundTime = Buffer.from(roundtimeInHax, "hex").toString("utf-8");
  const pwd = Buffer.from(pwdInHax, "hex").toString("utf-8");
  const iv = Buffer.from(roundTime.padEnd(16, "0"), "utf-8");
  const pkBlocks = Buffer.from(pwd.padEnd(16, "0"), "utf-8");
  const decipher = crypto.createDecipheriv("aes-128-cbc", pkBlocks, iv);
  let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};
const ua = async (url) => {
  try {
    const {
      data
    } = await axios$1.get(url, {
      headers: {
        "User-Agent": "okhttp/3.15"
      }
    });
    let content = data;
    const pattern = /[A-Za-z0]{8}\*\*/;
    const matcher = pattern.exec(content);
    if (typeof content === "object") {
      content = JSON.stringify(content);
    }
    if (matcher) {
      content = content.substring(matcher.index + matcher[0].length);
      content = Buffer.from(content, "base64").toString("utf-8");
      console.log("success", `base64解密：${url}`);
    }
    if (content.startsWith("2423")) {
      content = decryptAesBCB(content);
      console.log("success", `aes解密：${url}`);
    }
    return content;
  } catch (error) {
    console.error("解密失败", error.message);
  }
};
const downloadFile = async (url, filePath, maxRetries = 3) => {
  let retries = 0;
  return new Promise((resolve, reject) => {
    const down = async () => {
      try {
        const response = await axios$1({
          url,
          method: "GET",
          responseType: "stream",
          headers: {
            "User-Agent": "okhttp/3.15"
          },
          timeout: 3e4
        });
        const writer = fs$1.createWriteStream(filePath);
        stream.pipeline(response.data, writer, (error) => {
          if (error) {
            console.error(`文件下载出错：${url} , 出错原因：${error.message}`);
            resolve({
              status: "error",
              value: url
            });
          } else {
            console.log(`文件下载完成：${url}`);
            resolve({
              status: "success",
              value: url
            });
          }
        });
      } catch (error) {
        retries++;
        if (retries < maxRetries) {
          return down();
        } else {
          console.error(`文件下载失败：${url} , 失败原因：${error.message}`);
          resolve({
            status: "error",
            value: url
          });
        }
      }
    };
    down();
  });
};
const downloadFiles = async (urlsList, folderPath) => {
  try {
    const downloadPromises = urlsList.map((url) => {
      const filePath = path$1.join(folderPath, decodeURIComponent(path$1.basename(url).split("?")[0]));
      return downloadFile(url, filePath);
    });
    const downloadResults = await Promise.allSettled(downloadPromises);
    console.log("文件下载结束");
    const successResults = downloadResults.filter((result) => result.value.status === "success");
    const errorResults = downloadResults.filter((result) => result.value.status === "error");
    let fulfilledCount = successResults.length;
    let rejectedCount = errorResults.length;
    const successValues = successResults.map((result) => result.value.value);
    const errorValues = errorResults.map((result) => result.value.value);
    const drpyLink = urlsList.find((link) => link.includes("drpy") && link.includes("min.js") || link.includes("douban"));
    console.log(drpyLink);
    if (drpyLink) {
      const drpyDirname = path$1.dirname(drpyLink);
      const drpyBasename = path$1.basename(drpyLink);
      const drpyPath = `${folderPath}/${drpyBasename}`;
      if (fs$1.existsSync(drpyPath)) {
        let drpyContent = fs$1.readFileSync(drpyPath, "utf-8");
        const drpyFileNames = [];
        const newDrpyContent = drpyContent.replace(regex.drpyRegex, (match, p1, p2, p3, p4) => {
          drpyFileNames.push(p3);
          if (p2 === "") {
            return match;
          } else {
            return p1 + p3;
          }
        });
        console.log("drpyFileNames", drpyFileNames);
        fs$1.writeFileSync(drpyPath, newDrpyContent);
        const downloadPromisesDrpy = drpyFileNames.map(async (name) => {
          let url = `${drpyDirname}/${name}`;
          const filePath = path$1.join(folderPath, name);
          let resDb = await downloadFile(url, filePath);
          if (resDb.status == "error") {
            const fallbackUrls = [
              "http://v.tvfan.top:88/tvbox/js",
              "https://jihulab.com/duomv/duo/-/raw/main/js"
            ];
            for (const fallbackUrl of fallbackUrls) {
              url = `${fallbackUrl}/${name}`;
              resDb = await downloadFile(url, filePath);
              if (resDb.status != "error") {
                break;
              }
              console.log(`豆瓣依赖下载错误，换饭的链接，失败链接：${url}`);
            }
          }
          return resDb;
        });
        const downloadDrpyResults = await Promise.allSettled(downloadPromisesDrpy);
        fulfilledCount += downloadDrpyResults.filter((result) => result.value.status === "success").length;
        rejectedCount += downloadDrpyResults.filter((result) => result.value.status === "error").length;
      }
    }
    console.log(`共有 ${fulfilledCount} 个文件下载成功，${rejectedCount} 个文件下载失败`);
    return {
      successValues,
      errorValues,
      fulfilledCount,
      rejectedCount
    };
  } catch (error) {
    console.log("批量处理文件出错", "error");
  }
};
const getHash = async (content) => {
  if (typeof content === "object") {
    content = JSON.stringify(content);
    console.log("object");
  }
  const hash = await crypto.createHash("sha256").update(content).digest("hex");
  console.log(`内容的哈希值为：${hash}`);
  return hash;
};
const getHashToWeb = async (url) => {
  let result = await ua(url);
  result = stripComments(result);
  let hash = await getHash(result);
  return hash;
};
const removeEmojiAndText = (text) => {
  const emojiRegex = /[^\w\u4e00-\u9fa5-]|应用|家庭版|线路|专线/g;
  return text.replace(emojiRegex, "");
};
const updateFiles = async (url, name, config) => {
  try {
    let result = await ua(url);
    result = stripComments(result);
    const checkHashRes = result;
    const dotPath = `${path$1.dirname(url)}/`;
    const jarMatches = result.match(regex.jarRegex)[0];
    const jarUrl = jarMatches.includes("./") ? jarMatches.replace(/\.\//, dotPath) : jarMatches;
    const linkMatches = result.match(regex.linkRegex);
    const linkUrlList = linkMatches.map((link) => link.includes("./") ? link.replace(/\.\//, dotPath) : link);
    const urlsList = [...new Set([...linkUrlList].filter((url2) => url2))];
    const tvboxFolderName = config.tvboxFolderName;
    const tvboxFolderPath = path$1.join(desktopPath$1, tvboxFolderName);
    let jsonName = name ? pinyinPro.pinyin(removeEmojiAndText(name), { toneType: "none", type: "array" }).join("") : path$1.parse(url).name;
    let jarName = path$1.basename(jarUrl);
    const urlToJSONName = {
      "饭太硬": { name: "fty", jarName: "fty.jar" }
    };
    for (const [key, value] of Object.entries(urlToJSONName)) {
      if (url.includes(key)) {
        jsonName = value.name;
        if (value.jarName) {
          jarName = value.jarName;
        }
      }
    }
    const lineFolderPath = path$1.join(tvboxFolderPath, jsonName);
    const libFolderPath = path$1.join(tvboxFolderPath, jsonName, "lib");
    const jarPath = path$1.join(lineFolderPath, jarName);
    if (!fs$1.existsSync(libFolderPath)) {
      fs$1.mkdirSync(libFolderPath, {
        recursive: true
      });
    }
    const downJarResult = await downloadFile(jarUrl, jarPath, 2);
    const downLinkResult = await downloadFiles(urlsList, libFolderPath);
    console.log("失败资源数组", downLinkResult.errorValues);
    console.log("下载完成，开始处理json入口文件");
    const replaceResult = downJarResult.status == "success" ? result.replace(regex.jarRegex, `./${jarName}`) : result;
    let replaceLink = replaceResult.replace(regex.linkRegex, (match, p1, p2) => {
      if (downLinkResult.errorValues.includes(match)) {
        console.log(match);
        return match;
      } else {
        return `./lib/${decodeURIComponent(p2)}`;
      }
    });
    let tokExt = `http://127.0.0.1:9978/file/${tvboxFolderName}/token.txt`;
    const { token = "", wallpaper } = config;
    if (wallpaper) {
      replaceLink = replaceLink.replace(regex.wallpaperRegex, `$1"${wallpaper}"`);
    }
    if (token) {
      if (token.includes("http") || token.includes("clan") || token.includes("tok")) {
        tokExt = token;
      } else {
        fs$1.writeFileSync(path$1.join(tvboxFolderPath, "token.txt"), token);
      }
    }
    let stringifyJSON = "";
    try {
      const parseJSON5 = JSON5.parse(replaceLink);
      if (token) {
        const apiSet = /* @__PURE__ */ new Set(["csp_Paper", "csp_YiSo", "csp_PanSou", "csp_UpYun", "csp_Push", "csp_Zhaozy", "csp_Dovx", "csp_WoGG", "csp_PanSearch", "csp_TuGou"]);
        parseJSON5.sites = parseJSON5.sites.map((site) => {
          return apiSet.has(site.api) ? {
            ...site,
            ext: tokExt
          } : site;
        });
      }
      const urlToParseJSON5 = {
        "饭太硬": {
          callback: () => {
            parseJSON5.sites.splice(-2);
            parseJSON5.sites = parseJSON5.sites.map((site) => {
              if (site.key === "js豆瓣") {
                return {
                  ...site,
                  name: "🅱豆瓣┃推荐"
                };
              } else {
                return site;
              }
            });
          }
        }
      };
      for (const [key, value] of Object.entries(urlToParseJSON5)) {
        if (url.includes(key)) {
          value.callback();
        }
      }
      stringifyJSON = JSON.stringify(parseJSON5, null, 2);
      console.log("JSON5解析成功");
    } catch (error) {
      replaceLink = replaceLink.replace(regex.jsonerrRegex, `"$1":"$2"`);
      if (token) {
        replaceLink = replaceLink.replace(regex.tokenRegex, `$1"${tokExt}"`);
      }
      stringifyJSON = replaceLink;
      console.error(`JSON5解析失败 at line ${error.lineNumber}, column ${error.columnNumber}`);
    }
    const clanPath = `clan://localhost/${tvboxFolderName}/${jsonName}/${jsonName}.json`;
    fs$1.writeFileSync(path$1.join(lineFolderPath, `${jsonName}.json`), stringifyJSON);
    fs$1.writeFileSync(path$1.join(lineFolderPath, "配置地址.txt"), clanPath);
    if (downLinkResult.errorValues.length > 0) {
      fs$1.writeFileSync(path$1.join(lineFolderPath, "失败资源列表.txt"), downLinkResult.errorValues.join("\n"));
    }
    console.log("success", `更改${jsonName}.json成功`);
    const lineTipUrl = config?.lineTip?.url;
    console.log(lineTipUrl, url);
    if (lineTipUrl && lineTipUrl == url) {
      const hash = await getHash(checkHashRes);
      store$1.set("config.lineTip.hash", hash);
      console.log("设置hash，线路更新提醒");
    }
    if (config.isLines) {
      const addLine = {
        "url": clanPath,
        "name": name || `🚀${jsonName}`
      };
      const LPath = path$1.join(tvboxFolderPath, "L.json");
      if (fs$1.existsSync(LPath)) {
        console.log("L.json 文件存在");
        const LReadContent = fs$1.readFileSync(LPath, "utf-8");
        const LUrls = JSON.parse(LReadContent || "{}")?.urls || [];
        LUrls.push(addLine);
        const uniqueL = LUrls.reduce((acc, cur) => {
          const hasDuplicate = acc.some((item) => item.url === cur.url);
          if (!hasDuplicate) {
            acc.push(cur);
          }
          return acc;
        }, []);
        const LContent = {
          "urls": uniqueL
        };
        fs$1.writeFileSync(LPath, JSON.stringify(LContent, null, 2));
      } else {
        console.log("L.json 文件不存在");
        const urls = [addLine];
        const files = fs$1.readdirSync(tvboxFolderPath, { withFileTypes: true });
        const tvboxFolderNameFilter = files.filter((file) => file.isDirectory());
        tvboxFolderNameFilter.map((folder) => {
          let tvboxFolderLine = {
            "url": `clan://localhost/${tvboxFolderName}/${folder.name}/${folder.name}.json`,
            "name": folder.name
          };
          urls.push(tvboxFolderLine);
        });
        console.log(urls);
        const uniqueL = urls.reduce((acc, cur) => {
          const hasDuplicate = acc.some((item) => item.url === cur.url);
          if (!hasDuplicate) {
            acc.push(cur);
          }
          return acc;
        }, []);
        const LContent = {
          "urls": uniqueL
        };
        fs$1.writeFileSync(LPath, JSON.stringify(LContent, null, 2));
      }
      const clanLPath = `clan://localhost/${tvboxFolderName}/L.json`;
      fs$1.writeFileSync(path$1.join(tvboxFolderPath, "多线路配置地址.txt"), clanLPath);
      return clanLPath;
    }
    return clanPath;
  } catch (error) {
    console.error("下载列表文件时出错：", "error");
    return "error";
  }
};
const update = async (url, name) => {
  let config = store$1.get("config") || {};
  config.tvboxFolderName = "tvbox";
  let result = await updateFiles(url, name, config);
  return result;
};
const downloadJar = async (url) => {
  try {
    const result = await ua(url);
    const dotPath = `${path$1.dirname(url)}/`;
    const jarMatches = result.match(regex.jarRegex);
    const jarUrlList = jarMatches.map((link) => link.includes("./") ? link.replace(/\.\//, dotPath) : link);
    const jarurl = jarUrlList[0];
    let fileName = path$1.basename(jarurl);
    const fileExt = path$1.extname(fileName);
    if (!fileExt) {
      fileName += ".jar";
    }
    const jarPath = path$1.join(desktopPath$1, fileName);
    return await downloadFile(jarurl, jarPath);
  } catch (error) {
    console.error("下载列表文件时出错：", "error");
    return "error";
  }
};
const getJson = async () => {
  try {
    const { data } = await axios$1.get("https://jihulab.com/duomv/apps/-/raw/main/fast.json");
    const storeHouse = data.storeHouse;
    const arr = await Promise.all(
      storeHouse.map(async (item) => {
        const json = await axios$1.get(item.sourceUrl);
        try {
          const parseJSON5 = JSON5.parse(json.data)?.urls.slice(1);
          return parseJSON5;
        } catch (err) {
          const parseJSON = json.data?.urls.slice(1) || [];
          return parseJSON;
        }
      })
    ).then((results) => {
      return results.flat();
    });
    const arrFilter = arr.filter((item) => !item.url.includes("yydsys.top/duo/ali"));
    const uniqueArr = arrFilter.reduce((acc, cur) => {
      const hasDuplicate = acc.some((item) => item.url === cur.url);
      if (!hasDuplicate) {
        acc.push(cur);
      }
      return acc;
    }, []);
    return uniqueArr;
  } catch (error) {
    throw error.message;
  }
};
const getToken = async (token) => {
  try {
    const { data } = await axios$1.post("https://auth.aliyundrive.com/v2/account/token", {
      refresh_token: token,
      grant_type: "refresh_token"
    });
    return data.refresh_token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const nodeApi = {
  ua,
  update,
  getJson,
  downloadJar,
  getToken,
  getHashToWeb
};
const os = require("os");
const net = require("net");
const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
};
const scanPort = async (ip, port) => {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(1e3);
    socket.on("connect", () => {
      socket.destroy();
      resolve(ip);
    });
    socket.on("timeout", () => {
      socket.destroy();
      reject();
    });
    socket.on("error", () => {
      socket.destroy();
      reject();
    });
    socket.connect(port, ip);
  });
};
const scanLocalNetwork = (port) => {
  const localIpAddress = getLocalIpAddress();
  const promises = [];
  for (let i = 1; i <= 255; i++) {
    const ip = `${localIpAddress.slice(0, localIpAddress.lastIndexOf("."))}.${i}`;
    promises.push(scanPort(ip, port));
  }
  return Promise.allSettled(promises).then((results) => {
    const ips = results.filter((result) => result.status === "fulfilled").map((result) => `http://${result.value}:${port}`);
    return ips;
  }).catch((error) => {
    console.error(error);
    return [];
  });
};
const getIps = async () => {
  try {
    const ips = await scanLocalNetwork("9978");
    console.log(ips);
    if (ips.length) {
      return {
        status: "success",
        message: "已找到可用设备",
        ips
      };
    } else {
      return {
        status: "error",
        message: "未找到可用设备,请在手机或电视打开TVBOX",
        ips
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "查找设备出错，请重试",
      ips: []
    };
  }
};
const netApi = {
  getIps
};
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const desktopPath = path.join(require("os").homedir(), "Desktop");
class TvBoxUploader {
  constructor(tvboxIp) {
    this.tvboxIp = tvboxIp;
    this.axiosInstance = axios.create({
      baseURL: tvboxIp,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }
  async newFolder(path2, name) {
    try {
      const { data } = await this.axiosInstance.post("/newFolder", {
        path: path2,
        name
      });
    } catch (error) {
      console.error("newFolder", error.message);
    }
  }
  async delFolder(path2) {
    try {
      const { data } = await this.axiosInstance.post("/delFolder", {
        path: path2
      });
    } catch (error) {
      console.error("delFolder", error.message);
    }
  }
  async listFile() {
    const { data } = await this.axiosInstance.get("/file/");
    return data.files;
  }
  async upload(path2, files) {
    let formData = new FormData();
    formData.append("path", path2);
    for (let i = 0; i < files.length; i++) {
      formData.append(`files-${i}`, fs.createReadStream(files[i]));
    }
    try {
      const { data } = await this.axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...formData.getHeaders()
        }
      });
      console.log(path2, data);
    } catch (error) {
      console.error("upload", error.message);
    }
  }
  async uploadFolderToTvBox(folderPath, uploadPath) {
    if (!uploadPath.includes("/")) {
      await this.newFolder("", uploadPath);
    }
    let files = fs.readdirSync(folderPath);
    let filesArr = [];
    for (let i = 0; i < files.length; i++) {
      let fileName = files[i];
      let fillPath = path.join(folderPath, fileName);
      let file = fs.statSync(fillPath);
      if (file.isDirectory()) {
        await this.delFolder(`${uploadPath}/${fileName}`);
        await this.newFolder(uploadPath, fileName);
        await this.uploadFolderToTvBox(fillPath, `${uploadPath}/${fileName}`);
      } else {
        filesArr.push(fillPath);
      }
    }
    if (filesArr.length > 0) {
      await this.upload(uploadPath, filesArr);
    }
  }
  async action(data) {
    await this.axiosInstance.post("/action", data);
  }
  // async pushToAndroid() {
  // }
}
const pushToAndroid = async (tvboxIp) => {
  try {
    const tvboxName = "tvbox";
    let tvBoxUploader = await new TvBoxUploader(tvboxIp);
    let files = await tvBoxUploader.listFile();
    if (files.length == 0) {
      return {
        status: "error",
        message: "没有存储权限，请在TVBOX软件开启"
      };
    }
    try {
      let folderPath = path.join(desktopPath, tvboxName);
      await tvBoxUploader.uploadFolderToTvBox(folderPath, tvboxName);
      return {
        status: "success",
        message: "上传成功，请查看设备根目录"
      };
    } catch (error) {
      return {
        status: "error",
        message: `上传失败，电脑桌面没有${tvboxName}文件夹`
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "连接失败，请重新刷新IP"
    };
  }
};
const actionToAndroid = async (tvboxIp, data) => {
  try {
    let tvBoxUploader = await new TvBoxUploader(tvboxIp);
    await tvBoxUploader.action(data);
    return {
      status: "success",
      message: "推送成功"
    };
  } catch (error) {
    return {
      status: "error",
      message: "推送失败"
    };
  }
};
const pushApi = {
  pushToAndroid,
  actionToAndroid
};
const store = new Store();
class IpcHandlers {
  static registerIpcHandlers(ipcMain) {
    ipcMain.handle("update", IpcHandlers.handleUpdate);
    ipcMain.handle("ua", IpcHandlers.handleUA);
    ipcMain.handle("getJson", IpcHandlers.handleGetJson);
    ipcMain.handle("downloadJar", IpcHandlers.handleDownloadJar);
    ipcMain.handle("getToken", IpcHandlers.handleGetToken);
    ipcMain.handle("getHashToWeb", IpcHandlers.handleGetHashToWeb);
    ipcMain.handle("getItem", IpcHandlers.handleGetItem);
    ipcMain.handle("setItem", IpcHandlers.handleSetItem);
    ipcMain.handle("deleteItem", IpcHandlers.handleDeleteItem);
    ipcMain.handle("getIps", IpcHandlers.handleGetIps);
    ipcMain.handle("pushToAndroid", IpcHandlers.handlePushToAndroid);
    ipcMain.handle("actionToAndroid", IpcHandlers.handleActionToAndroid);
  }
  static async handleUpdate(event, url, name) {
    let result = await nodeApi.update(url, name);
    return result;
  }
  static async handleUA(event, url) {
    console.log(`Updating with URL: ${url}`);
    let result = await nodeApi.ua(url);
    return result;
  }
  static async handleGetJson(event) {
    let result = await nodeApi.getJson();
    return result;
  }
  static async handleDownloadJar(event, url) {
    let result = await nodeApi.downloadJar(url);
    return result;
  }
  static async handleGetToken(event, token) {
    let result = await nodeApi.getToken(token);
    return result;
  }
  static async handleGetHashToWeb(event, url) {
    let result = await nodeApi.getHashToWeb(url);
    return result;
  }
  static async handleGetItem(event, key) {
    return store.get(key);
  }
  static async handleSetItem(event, key, value) {
    store.set(key, value);
  }
  static async handleDeleteItem(event, key, value) {
    store.delete(key);
  }
  static async handleGetIps(event) {
    let result = await netApi.getIps();
    return result;
  }
  static async handlePushToAndroid(event, tvboxIp) {
    let result = await pushApi.pushToAndroid(tvboxIp);
    return result;
  }
  static async handleActionToAndroid(event, tvboxIp, data) {
    let result = await pushApi.actionToAndroid(tvboxIp, data);
    return result;
  }
}
class AutoUpdater {
  static update(mainWindow) {
    const isDevelopment = process.env.NODE_ENV === "development";
    if (isDevelopment) {
      electronUpdater.autoUpdater.updateConfigPath = path$1.join(__dirname, "../../", "dev-app-update.yml");
    }
    electronUpdater.autoUpdater.autoDownload = false;
    electronUpdater.autoUpdater.on("error", function(message) {
      mainWindow.webContents.send("autoUpdater", { status: "error", message });
      console.log("error", "Cannot find latest.yml");
    });
    electronUpdater.autoUpdater.on("checking-for-update", function(message) {
      console.log("checking-for-update", message);
    });
    electronUpdater.autoUpdater.on("update-available", function(message) {
      console.log("update-available", message);
      if (message.mandatory) {
        electronUpdater.autoUpdater.downloadUpdate();
      } else {
        mainWindow.webContents.send("autoUpdater", { status: "update-available", message });
      }
    });
    electronUpdater.autoUpdater.on("update-not-available", function(message) {
      console.log("update-not-available", message);
    });
    electronUpdater.autoUpdater.on("download-progress", function(message) {
      mainWindow.webContents.send("autoUpdater", { status: "download-progress", message });
    });
    electronUpdater.autoUpdater.on("update-downloaded", function(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      console.log("update-downloaded");
      electronUpdater.autoUpdater.quitAndInstall();
    });
    electronUpdater.autoUpdater.checkForUpdates();
    electron.ipcMain.on("updateNow", (e, arg) => {
      console.log("开始更新");
      electronUpdater.autoUpdater.downloadUpdate();
    });
  }
}
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      // nodeInteration: true,
      preload: path$1.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path$1.join(__dirname, "../renderer/index.html"));
  }
  mainWindow.setTitle(`TVBOX助手(黎歌${electron.app.getVersion()})`);
  IpcHandlers.registerIpcHandlers(electron.ipcMain);
  AutoUpdater.update(mainWindow);
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
