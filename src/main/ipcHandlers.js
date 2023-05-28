import nodeApi from '../node/index'
import netApi from '../node/net'
import pushApi from '../node/push'
import Store from 'electron-store';
const store = new Store();

class IpcHandlers {
  static registerIpcHandlers(ipcMain) {
    ipcMain.handle('update', IpcHandlers.handleUpdate);
    ipcMain.handle('ua', IpcHandlers.handleUA);
    ipcMain.handle('getJson', IpcHandlers.handleGetJson);
    ipcMain.handle('downloadJar', IpcHandlers.handleDownloadJar);
    ipcMain.handle('getToken', IpcHandlers.handleGetToken);
    ipcMain.handle('getHashToWeb', IpcHandlers.handleGetHashToWeb);
    ipcMain.handle('getItem', IpcHandlers.handleGetItem);
    ipcMain.handle('setItem', IpcHandlers.handleSetItem);
    ipcMain.handle('deleteItem', IpcHandlers.handleDeleteItem);

    ipcMain.handle('getIps', IpcHandlers.handleGetIps);
    ipcMain.handle('pushToAndroid', IpcHandlers.handlePushToAndroid);
    ipcMain.handle('actionToAndroid', IpcHandlers.handleActionToAndroid);
  }

  static async handleUpdate(event, url,name) {
    let result = await nodeApi.update(url,name);
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
  static async handleSetItem(event, key,value) {
     store.set(key,value);
  }
  static async handleDeleteItem(event, key,value) {
     store.delete(key);
  }

  static async handleGetIps(event) {
    let result = await netApi.getIps();
    return result;
  }
  static async handlePushToAndroid(event,tvboxIp) {
    let result = await pushApi.pushToAndroid(tvboxIp);
    return result;
  }

  static async handleActionToAndroid(event,tvboxIp,data) {
    let result = await pushApi.actionToAndroid(tvboxIp,data);
    return result;
  }
}

export default IpcHandlers;