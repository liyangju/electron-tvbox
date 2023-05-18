"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  update: async (url, name, config) => {
    const result = await electron.ipcRenderer.invoke("update", url, name, config);
    return result;
  },
  ua: async (url) => {
    const result = await electron.ipcRenderer.invoke("ua", url);
    return result;
  },
  getJson: async () => {
    const result = await electron.ipcRenderer.invoke("getJson");
    return result;
  },
  downloadJar: async (url) => {
    const result = await electron.ipcRenderer.invoke("downloadJar", url);
    return result;
  },
  getToken: async (token) => {
    const result = await electron.ipcRenderer.invoke("getToken", token);
    return result;
  }
};
const updateIpc = {
  autoUpdater: (callback) => {
    electron.ipcRenderer.on("autoUpdater", (_, data) => {
      callback(data);
    });
  },
  updateNow: async () => {
    await electron.ipcRenderer.send("updateNow");
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
    electron.contextBridge.exposeInMainWorld("updateIpc", updateIpc);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
  window.updateIpc = updateIpc;
}
