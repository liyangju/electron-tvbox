import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  update: async (url,name, config) => {
    const result = await ipcRenderer.invoke('update', url,name);
    return result;
  },
  ua: async (url) => {
    const result = await ipcRenderer.invoke('ua', url);
    return result;
  },
  getJson: async () => {
    const result = await ipcRenderer.invoke('getJson');
    return result;
  },
  downloadJar: async (url) => {
    const result = await ipcRenderer.invoke('downloadJar', url);
    return result;
  },
  getToken: async (token) => {
    const result = await ipcRenderer.invoke('getToken', token);
    return result;
  },
  getHashToWeb: async (url) => {
    const result = await ipcRenderer.invoke('getHashToWeb', url);
    return result;
  },
}

const store = {
  setItem: async (key, value) => {
    console.log(key,value)
    await ipcRenderer.invoke('setItem', key, value);
  },
  getItem: async (key) => {
    const result = await ipcRenderer.invoke('getItem', key);
    return result;
  },
  deleteItem: async (key) => {
    await ipcRenderer.invoke('deleteItem', key);
  }
}

const updateIpc = {
  autoUpdater: (callback) => {
    ipcRenderer.on('autoUpdater', (_, data) => {
      callback(data);
    });
  },

  updateNow: async () => {
    await ipcRenderer.send('updateNow');
  }

}


// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('store', store)
    contextBridge.exposeInMainWorld('updateIpc', updateIpc)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.store = store
  window.updateIpc = updateIpc
}
