import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import axios from 'axios';
import JSON5 from 'json5';
import stripComments from 'strip-comments';
import { pipeline } from 'stream';
import Store from 'electron-store';
const store = new Store();

const desktopPath = require('os').homedir()+ '/Desktop'; //获取当前用户的桌面路径



const decryptAesBCB = async(encryptedData)=> {
    const dataArr = encryptedData.split("");
    const prefixCode = Buffer.from("$#", "utf-8").toString("hex");
    const suffixCode = Buffer.from("#$", "utf-8").toString("hex");
    // console.log(prefixCode, suffixCode)
    const pwdMix = dataArr
      .splice(0, encryptedData.indexOf(suffixCode) + 4)
      .join("");
    const roundtimeInHax = dataArr.splice(dataArr.length - 26, 26).join("");
    const encryptedText = dataArr.join("");
    const pwdInHax = pwdMix.substring(
      prefixCode.length,
      pwdMix.length - suffixCode.length
    );
  
    // console.log(pwdMix, roundtimeInHax, pwdInHax);
  
    const roundTime = Buffer.from(roundtimeInHax, "hex").toString("utf-8");
    const pwd = Buffer.from(pwdInHax, "hex").toString("utf-8");
    const iv = Buffer.from(roundTime.padEnd(16, "0"), "utf-8");
    const pkBlocks = Buffer.from(pwd.padEnd(16, "0"), "utf-8");
    const decipher = crypto.createDecipheriv("aes-128-cbc", pkBlocks, iv);
    let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
  
    return decryptedData;
}

const ua = async(url)=>{
    try{
        const {
            data
        } = await axios.get(url, {
            headers: {
                "User-Agent": "okhttp/3.15",
                'Allow':true
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
            content = Buffer.from(content, 'base64').toString('utf-8');
            console.log('success',`base64解密：${url}`);
        }
    
        if (content.startsWith('2423')) {
            content = decryptAesBCB(content);
            console.log('success',`aes解密：${url}`);
        }
        return content;
    }catch(error){
        console.error("解密失败",error.message);
    }
}

const downloadFile = async (url, filePath, maxRetries = 3) => {
    let retries = 0;
    return new Promise((resolve, reject) => {
        const down = async () => {
            try {
                const response = await axios({
                    url,
                    method: 'GET',
                    responseType: 'stream',
                    headers: {
                        'User-Agent': 'okhttp/3.15'
                    },
                    timeout:30000
                });

                const writer = fs.createWriteStream(filePath);

                pipeline(response.data, writer, (error) => {
                    if (error) {
                      console.error(`文件下载出错：${url} , 出错原因：${error.message}`);
                      resolve({
                        status: 'error',
                        value: url,
                      });
                    } else {
                      console.log(`文件下载完成：${url}`);
                      resolve({
                        status: 'success',
                        value: url,
                      });
                    }
                  });
            } catch (error) {
                // console.error(`文件下载出错：${url}`, "err");
                retries++;
                if (retries < maxRetries) {
                    // console.log(`正在第${retries}次重试：${url}`);
                    return down();
                } else {
                    console.error(`文件下载失败：${url} , 失败原因：${error.message}`);
                    resolve({
                        status: 'error',
                        value: url
                    })
                }
            }
        }

        down()

    })
};

const downloadFiles = async(urlsList, folderPath)=> {
    try{
        const downloadPromises = urlsList.map((url) => {
            const filePath = path.join(folderPath, decodeURIComponent(path.basename(url).split('?')[0]));
            return downloadFile(url, filePath);
        });
        // 下载配置的依赖文件
        const downloadResults = await Promise.allSettled(downloadPromises);
        // console.log(downloadResults)
        // const kk = JSON.stringify({urls:downloadResults})
        // fs.writeFileSync('test.json', kk);
        console.log("文件下载结束");
        // return;
        const successResults = downloadResults.filter((result) => result.value.status === 'success');
        const errorResults = downloadResults.filter((result) => result.value.status === 'error');
        let fulfilledCount = successResults.length;
        let rejectedCount = errorResults.length;
        const successValues = successResults.map(result => result.value.value);
        const errorValues = errorResults.map(result => result.value.value);
        // 单独处理drpy.min.js里面的链接
        const drpyLink = urlsList.find(link => (link.includes('drpy') && link.includes('min.js')) || link.includes('douban'))
        console.log(drpyLink)
        if (drpyLink) {
            const drpyDirname = path.dirname(drpyLink);
            const drpyBasename = path.basename(drpyLink);
            const drpyPath = `${folderPath}/${drpyBasename}`;
            // console.log(drpyDirname, drpyBasename)
            if (fs.existsSync(drpyPath)) {
    
                let drpyContent = fs.readFileSync(drpyPath, 'utf-8');
                // const regex = /(import[^"']*["'])([^"']*\/)?([^"']*?\.(js|jsx|ts|tsx)["'])/g;
                // const newDrpyContent = drpyContent.replace(regex, '$1$3');
                // console.log("new",newDrpyContent);
    
                const regex = /(import[^"']*["'])([^"']*\/)?([^"']*?\.(js|jsx|ts|tsx))/g;
                const drpyFileNames = [];
                const newDrpyContent = drpyContent.replace(regex, (match, p1, p2, p3, p4) => {
                drpyFileNames.push(p3);
                if (p2 === '') {
                    return match;
                } else {
                    return p1 + p3;
                }
                });
    

                console.log("drpyFileNames", drpyFileNames);
                fs.writeFileSync(drpyPath, newDrpyContent);
                const downloadPromisesDrpy = drpyFileNames.map(async (name) => {
                    let url = `${drpyDirname}/${name}`;
                    const filePath = path.join(folderPath, name);
                    let resDb = await downloadFile(url, filePath)
                    // console.log(resDb)
                    if (resDb.status == 'error') {
                        const fallbackUrls = [
                        'http://v.tvfan.top:88/tvbox/js',
                        'https://jihulab.com/duomv/duo/-/raw/main/js'
                        ];
                    
                        for (const fallbackUrl of fallbackUrls) {
                        url = `${fallbackUrl}/${name}`;
                        resDb = await downloadFile(url, filePath);
                        if (resDb.status != 'error') {
                            break;
                        }
                        console.log(`豆瓣依赖下载错误，换饭的链接，失败链接：${url}`);
                        }
                    }
                    return resDb;
                });
                const downloadDrpyResults = await Promise.allSettled(downloadPromisesDrpy);
                fulfilledCount += downloadDrpyResults.filter((result) => result.value.status === 'success').length;
                rejectedCount += downloadDrpyResults.filter((result) => result.value.status === 'error').length;
            }
        }
    
        console.log(`共有 ${fulfilledCount} 个文件下载成功，${rejectedCount} 个文件下载失败`);
    
        return {
            successValues,
            errorValues,
            fulfilledCount,
            rejectedCount
        };
    }catch(error){
        console.log("批量处理文件出错","error")
    }
   
}

const getHash = async(content)=>{
    if(typeof content === 'object'){
        content = JSON.stringify(content)
        console.log('object')
    }

    const hash = await crypto.createHash('sha256').update(content).digest('hex');
    
    console.log(`内容的哈希值为：${hash}`);

    return hash;
}

const getHashToWeb = async(url)=>{
    let result = await ua(url);
    result = stripComments(result);
    let hash = await getHash(result)
    return hash;
}

  
const updateFiles = async(url,name,config) =>{
    let result = await ua(url);
    // 去掉注释
    result = stripComments(result);

    const checkHashRes = result;

    // fs.writeFileSync('test.json', result);
    // return;
    const dotPath = `${path.dirname(url)}/`;

    const jarRegex = /(?<=['"]?\s*spider\s*['"]?\s*:\s*['"]\s*)(https?:\/\/|\.\/)([^'"\s]+\/)?([^'"\s;?}]+)/g;
    const jarMatches = result.match(jarRegex)[0];
    const jarUrl =   jarMatches.includes('./') ? jarMatches.replace(/\.\//, dotPath) : jarMatches;
    
    // const linkRegex = /(?<!['"]\s*spider\s*['"]\s*:\s*['"])(?<=['"]\s*)(https?:\/\/|\.\/)(?:[^'"\s]+\/)?((?!tok)[^'"\s\/]+\.(?:json|js|py|jar|txt))(?=\s*['";?])/g;
    const linkRegex = /(?<!['"]\s*spider\s*['"]\s*:\s*['"])(?<=['"]\s*)(https?:\/\/|\.\/)(?:[^'"\s]+\/)?((?!tok)[^'"\s\/]+\.(?:json|js|py|jar|txt)(\?[^'"\s]+)?)(?=\s*['";])/g;
    const linkMatches = result.match(linkRegex);
    const linkUrlList = linkMatches.map(link => link.includes('./') ? link.replace(/\.\//, dotPath) : link);
    const urlsList = [...new Set([...linkUrlList].filter(url => url))];
    
    // 处理JSON文件

    // 所有文件放的文件夹，默认为tvbox文件夹
    const tvboxFolderName = config.tvboxFolderName;
    const tvboxFolderPath = path.join(desktopPath, tvboxFolderName);
    // 得到线路名称，以链接最后一层命名
    let jsonName = path.parse(url).name;
    // 得到jar文件的具体路径
    let jarName = path.basename(jarUrl);
    // 处理文件夹名称或者单独配置项开始
    const urlToJSONName = {
        '饭太硬': { name: 'fty',jarName:'fty.jar' },
        '肥猫': { name: 'feimao' },
        'FongMi': { name: 'fongmi' },
        'pastebin': { name: 'daozhang' },
        'cainisi': { name: 'cainisi' },
        '101.34.67.237': { name: 'xiaoya' },
        'jundie': { name: 'junyu' },
        'dxawi': { name: 'dxawi' },
        'liucn': { name: 'liucn' },
        'ygbh': { name: 'ygbh' },
        'xc': { name: 'xingchen' },
        'download/2863': { name: 'xiaosa' },
        '云星日记': { name: 'yunxingriji' },
        '源享家': { name: 'yuanxiangjia' },
        'download/2883': { name: 'mayiluntan' },
        '66666/mao': { name: 'fenxiangzhe' },
        'binghe': { name: 'binghe' },
        'chengxueli': { name: 'baixinyuan' },
        'kebedd69': { name: 'tianmi' },
        'xianyuyimu': { name: 'yimu' },
        'kvymin': { name: 'kvymin' },
        'a/b/c': { name: 'abc' },
        'gaotianliuyun': { name: 'gaotianliuyun' },
        'Yosakoii': { name: 'Yosakoii' }
    };
    
    for (const [key, value] of Object.entries(urlToJSONName)) {
        if (url.includes(key)) {
            jsonName = value.name;
            if(value.jarName){
                jarName = value.jarName;
            }
        }
    }

    // 线路文件夹路径
    const lineFolderPath = path.join(tvboxFolderPath, jsonName);

    // 线路里面lib文件夹的路径
    const libFolderPath = path.join(tvboxFolderPath, jsonName, 'lib');

    const jarPath = path.join(lineFolderPath,jarName);

    if (!fs.existsSync(libFolderPath)) {
        fs.mkdirSync(libFolderPath, {
            recursive: true
        });
    }



    try {
        // 下载
        const downJarResult = await downloadFile(jarUrl, jarPath,2);
        // console.log(downJarResult)
        const downLinkResult = await downloadFiles(urlsList, libFolderPath);
        // const downLinkResult = {errorValues:[]};
        console.log("失败资源数组",downLinkResult.errorValues)
        console.log("下载完成，开始处理json入口文件")
        // 处理json入口文件开始
        const replaceResult = downJarResult.status == "success" ? result.replace(jarRegex, `./${jarName}`) : result;
        // const replaceLink = replaceResult.replace(linkRegex, `./lib/$3`);
        let replaceLink = replaceResult.replace(linkRegex, (match, p1, p2)=> {
            // 下载失败不改
            if(downLinkResult.errorValues.includes(match)){
                console.log(match)
                return match;
            }else{
                return `./lib/${decodeURIComponent(p2)}`;
            }
        });


        // 处理token开始
        let tokExt = `http://127.0.0.1:9978/file/${tvboxFolderName}/token.txt`;
        const { token = '', wallpaper } = config;

        // 处理壁纸
        if (wallpaper) {
            replaceLink = replaceLink.replace(/(['"]wallpaper['"]\s*:\s*)(['"][^'"]*['"])/g, `$1"${wallpaper}"`)
        }
        if(token){
            if (token.includes('http') ||  token.includes('clan') || token.includes('tok')) {
                tokExt = token
            } else {
                fs.writeFileSync(path.join(tvboxFolderPath, 'token.txt'), token);
            }
        }


        let stringifyJSON = '';
        try{
            const parseJSON5 = JSON5.parse(replaceLink);

            const apiSet = new Set(['csp_Paper', 'csp_YiSo', 'csp_PanSou', 'csp_UpYun', 'csp_Push', 'csp_Zhaozy', 'csp_Dovx', 'csp_WoGG','csp_PanSearch','csp_TuGou']);
            // console.log("url",url)
            parseJSON5.sites = parseJSON5.sites.map(site => {
                return apiSet.has(site.api) ? {
                    ...site,
                    ext: tokExt
                } : site;
            });

            // 单独处理一些JSON格式
            const urlToParseJSON5 = {
                '饭太硬': {
                    callback: () => {
                        parseJSON5.sites.splice(-2);
                        parseJSON5.sites = parseJSON5.sites.map(site => {
                            if (site.key === 'js豆瓣') {
                                return {
                                    ...site,
                                    name: '🅱豆瓣┃推荐'
                                };
                            } else {
                                return site;
                            }
                        });
                    }
                }
            }

            for (const [key, value] of Object.entries(urlToParseJSON5)) {
                if (url.includes(key)) {
                    value.callback();
                }
            }
            stringifyJSON = JSON.stringify(parseJSON5, null, 2);
            console.log("JSON5解析成功")
        }catch(error){
            // 处理错误json格式
            replaceLink = replaceLink.replace(/['"]\s*(\w+)\s*['"]\s*:\s*([\w\u4e00-\u9fa5\-]+)\s*['"]/g, `"$1":"$2"`)
            // 处理token
            replaceLink = replaceLink.replace(/(['"]\s*api\s*['"]\s*:\s*['"]\s*(csp_Paper|csp_YiSo|csp_PanSou|csp_UpYun|csp_Push|csp_Zhaozy|csp_Dovx|csp_WoGG|csp_PanSearch|csp_TuGou|csp_Upyunso|csp_AliPS|csp_Yiso|csp_PushAgent|csp_Gitcafe)\s*['"].+['"]\s*ext\s*['"]\s*:\s*)(['"][^'"]*['"])/g, `$1"${tokExt}"`)
            stringifyJSON = replaceLink;
            console.error(`JSON5解析失败 at line ${error.lineNumber}, column ${error.columnNumber}`);
        }
        
        // 处理json入口文件结束

        const clanPath = `clan://localhost/${tvboxFolderName}/${jsonName}/${jsonName}.json`
        fs.writeFileSync(path.join(lineFolderPath, `${jsonName}.json`), stringifyJSON);
        fs.writeFileSync(path.join(lineFolderPath, '配置地址.txt'), clanPath);
        if(downLinkResult.errorValues.length>0){
            fs.writeFileSync(path.join(lineFolderPath, '失败资源列表.txt'), downLinkResult.errorValues.join('\n'));
        }
        console.log('success',`更改${jsonName}.json成功`)

        // 是否线路更新提醒
        const lineTipUrl = config?.lineTip?.url;
        console.log(lineTipUrl,url)
        if(lineTipUrl&&lineTipUrl == url){
            const hash =  await getHash(checkHashRes);
            store.set('config.lineTip.hash',hash);
            console.log("设置hash，线路更新提醒")
        }

        // 是否生成多线路
        if(config.isLines){
            // 如果文件存在则读取文件内容
            const addLine = {
                "url": clanPath,
                "name": name || `🚀${jsonName}`
            }
            const LPath = path.join(tvboxFolderPath, 'L.json');
            if (fs.existsSync(LPath)) {
                console.log('L.json 文件存在');
                const LReadContent = fs.readFileSync(LPath, 'utf-8');
                const LUrls = JSON.parse(LReadContent||'{}')?.urls || [];
                LUrls.push(addLine)
                const uniqueL = LUrls.reduce((acc, cur) => {
                    const hasDuplicate = acc.some(item => item.url === cur.url);
                    if (!hasDuplicate) {
                        acc.push(cur);
                    }
                    return acc;
                }, []);
                // console.log(uniqueL);
                const LContent = {
                    "urls": uniqueL
                }
                fs.writeFileSync(LPath, JSON.stringify(LContent,null,2));
                
            } else {
                console.log('L.json 文件不存在');
                const urls = [addLine]
                
                const files = fs.readdirSync(tvboxFolderPath, { withFileTypes: true });
                // 过滤出所有文件夹
                const tvboxFolderNameFilter = files.filter(file => file.isDirectory());
                tvboxFolderNameFilter.map(folder => {
                    let tvboxFolderLine = {
                        "url": `clan://localhost/${tvboxFolderName}/${folder.name}/${folder.name}.json`,
                        "name": folder.name
                    }
                    urls.push(tvboxFolderLine)
                });
                console.log(urls)
                const uniqueL = urls.reduce((acc, cur) => {
                    const hasDuplicate = acc.some(item => item.url === cur.url);
                    if (!hasDuplicate) {
                        acc.push(cur);
                    }
                    return acc;
                }, []);
                // console.log(uniqueL);
                const LContent = {
                    "urls": uniqueL
                }

                fs.writeFileSync(LPath, JSON.stringify(LContent,null,2));
            }
            const clanLPath = `clan://localhost/${tvboxFolderName}/L.json`
            fs.writeFileSync(path.join(tvboxFolderPath, '多线路配置地址.txt'), clanLPath);
            return clanLPath;
        }

        return clanPath;
    } catch (error) {
        console.error('下载列表文件时出错：', "error");
        return 'error';
    }
}




const update= async(url,name) => {
    let config = store.get('config') || {}
    config.tvboxFolderName = 'tvbox';
    let result = await updateFiles(url,name,config);
    return result;
}

const downloadJar = async(url)=>{
    try {
        const result = await ua(url);
        // console.log(result)
        const dotPath = `${path.dirname(url)}/`;
        const jarRegex = /(?<=['"]\s*spider\s*['"]\s*:\s*['"])(https?:\/\/|\.\/)([^\s'"]+\/)*([^\s'";}]+)/g
        const jarMatches = result.match(jarRegex);
        const jarUrlList = jarMatches.map(link => link.includes('./') ? link.replace(/\.\//, dotPath) : link);
        const jarurl = jarUrlList[0];
        let fileName = path.basename(jarurl);
        const fileExt = path.extname(fileName);
        if (!fileExt) {
            fileName += '.jar';
        }
        const jarPath = path.join(desktopPath, fileName);
        // console.log(jarPath);
        return await downloadFile(jarurl,jarPath);
    } catch (error) {
        console.error('下载列表文件时出错：', "error");
        return 'error';
    }
}


const getJson = async () => {
    try {
        const { data } = await axios.get('https://jihulab.com/duomv/apps/-/raw/main/fast.json');
      
        // 合并 storeHouse 数组并去掉最后一个元素
        // const storeHouse = data.storeHouse.slice(0, -1);
        const storeHouse = data.storeHouse;
  
        // 并行获取所有 sourceUrl 对应的 JSON 数据，并将所有 urls 合并为一个数组
        const arr = await Promise.all(
            storeHouse.map(async (item) => {
                const json = await axios.get(item.sourceUrl);
                try {
                    const parseJSON5 = JSON5.parse(json.data) ?. urls.slice(1);
                    return parseJSON5;
                }catch(err){
                    const parseJSON = json.data ?. urls.slice(1) || [];
                    return parseJSON;
                }
            })
        ).then((results) => {
            return results.flat();
        });

        // 过滤掉yydsys.top
        const arrFilter = arr.filter(item=>!item.url.includes('yydsys.top'))

        const uniqueArr = arrFilter.reduce((acc, cur) => {
            const hasDuplicate = acc.some(item => item.url === cur.url);
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
        const { data } = await axios.post('https://auth.aliyundrive.com/v2/account/token', {
            refresh_token: token,
            grant_type: 'refresh_token',
        });
        return data.refresh_token;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export default {
    ua,
    update,
    getJson,
    downloadJar,
    getToken,
    getHashToWeb
};