import nodeApi from '../node/index'

class IpcHandlers {
  static registerIpcHandlers(ipcMain) {
    ipcMain.handle('update', IpcHandlers.handleUpdate);
    ipcMain.handle('ua', IpcHandlers.handleUA);
    ipcMain.handle('getJson', IpcHandlers.handleGetJson);
    ipcMain.handle('downloadJar', IpcHandlers.handleDownloadJar);
    ipcMain.handle('getToken', IpcHandlers.handleGetToken);
  }

  static async handleUpdate(event, url,name,config) {
    console.log(`Updating with URL: ${url}`);
    let result = await nodeApi.update(url,name,config);
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
}

export default IpcHandlers;