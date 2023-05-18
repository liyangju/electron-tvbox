import { app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater';
import path from 'path';

class AutoUpdater {
  static update(mainWindow) {
    // 配置安装包远端服务器
    // autoUpdater.setFeedURL(feedUrl);
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      // 处理开发环境被跳过更新问题，临时使用，使用完注释掉
      // Object.defineProperty(app, 'isPackaged', {
      //   get() {
      //     return true
      //   },
      // })
      // 如果不想启node服务，使用本地测试yml文件，测试更新
      autoUpdater.updateConfigPath = path.join(__dirname, '../../', 'dev-app-update.yml')
    }
    // 用来控制是否自动下载更新包
    autoUpdater.autoDownload = false;
    // 下面是自动更新的整个生命周期所发生的事件
    autoUpdater.on('error', function (message) {
      mainWindow.webContents.send('autoUpdater', { status: 'error', message });
      console.log('error', "Cannot find latest.yml");
    });
    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', function (message) {
      console.log('checking-for-update', message);
    });
    // 发现可更新版本时触发
    autoUpdater.on('update-available', function (message) {
      console.log('update-available', message);
      // 判断是否为强制更新
      if(message.mandatory){
        // 强制更新
        autoUpdater.downloadUpdate();
      }else{
        mainWindow.webContents.send('autoUpdater', { status: 'update-available', message });
      }
    });
    // 没有可更新版本时触发
    autoUpdater.on('update-not-available', function (message) {
      console.log('update-not-available', message);
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (message) {
        mainWindow.webContents.send('autoUpdater', { status: 'download-progress', message });
      // console.log('downloadProgress', progressObj);
      // mainWindow.webContents.send('download-progress', progressObj);
    });
    // 更新包下载完成时触发
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      console.log('update-downloaded');
      // 包下载完成后，重启当前的应用并且安装更新
      autoUpdater.quitAndInstall();
    });

    // 执行自动更新检查
    autoUpdater.checkForUpdates();

    ipcMain.on('updateNow', (e, arg) => {
      console.log('开始更新')
      autoUpdater.downloadUpdate();
    })

  }
}

export default AutoUpdater;