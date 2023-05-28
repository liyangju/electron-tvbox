const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const desktopPath = path.join(require('os').homedir(), 'Desktop');

class TvBoxUploader {
    constructor(tvboxIp) {
        this.tvboxIp = tvboxIp;
        this.axiosInstance = axios.create({
            baseURL: tvboxIp,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
    }

    async newFolder(path, name) {
        try {
            const { data } = await this.axiosInstance.post('/newFolder', {
                path: path,
                name: name
            });
            // console.log(data);
        } catch (error) {
            console.error("newFolder", error.message);
        }
    }

    async delFolder(path) {
        try {
            const { data } = await this.axiosInstance.post('/delFolder', {
                path: path
            });
            // console.log(data);
        } catch (error) {
            console.error("delFolder", error.message);
        }
    }

    async listFile() {
        const { data } = await this.axiosInstance.get('/file/');
        return data.files;
    }

    async upload(path, files) {
        let formData = new FormData();
        formData.append('path', path);

        for (let i = 0; i < files.length; i++) {
            formData.append(`files-${i}`, fs.createReadStream(files[i]));
        }

        try {
            const { data } = await this.axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...formData.getHeaders(),
                },
            });
            console.log(path, data);
        } catch (error) {
            console.error("upload", error.message);
        }
    }

    async uploadFolderToTvBox(folderPath, uploadPath) {
        // console.log(uploadPath)
        if (!uploadPath.includes('/')) {
            await this.newFolder('', uploadPath);
        }
        // 读取目录中的所有文件及文件夹（同步操作）
        let files = fs.readdirSync(folderPath);
        let filesArr = [];

        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            // 当前文件的全路径
            let fillPath = path.join(folderPath, fileName);
            // 获取一个文件的属性
            let file = fs.statSync(fillPath);
            // 判断是文件夹还是文件
            if (file.isDirectory()) {
                // 删除文件夹
                await this.delFolder(`${uploadPath}/${fileName}`);
                // 新建文件夹
                await this.newFolder(uploadPath, fileName);
                // （递归）重新检索目录文件
                await this.uploadFolderToTvBox(fillPath, `${uploadPath}/${fileName}`);
            } else {
                // push上传文件到数组
                filesArr.push(fillPath);
            }
        }
        if (filesArr.length > 0) {
            // console.log(uploadPath, filesArr);
            // 上传文件的操作
            await this.upload(uploadPath, filesArr);
        }
    }

    
    async action(data) {
        await this.axiosInstance.post('/action', data);
    }


    // async pushToAndroid() {

    // }
}


const pushToAndroid = async (tvboxIp) => {
    try {
        const tvboxName = 'tvbox';
        let tvBoxUploader = await new TvBoxUploader(tvboxIp)

        let files = await tvBoxUploader.listFile();
        if (files.length == 0) {
            return {
                status: "error",
                message: "没有存储权限，请在TVBOX软件开启"
            }
        }
        try {
            let folderPath = path.join(desktopPath, tvboxName);
            await tvBoxUploader.uploadFolderToTvBox(folderPath, tvboxName);
            return {
                status: "success",
                message: "上传成功，请查看设备根目录"
            }
        } catch (error) {
            return {
                status: "error",
                message: `上传失败，电脑桌面没有${tvboxName}文件夹`
            }
        }
    } catch (error) {
        return {
            status: "error",
            message: "连接失败，请重新刷新IP"
        }
    }
}

const actionToAndroid = async (tvboxIp,data) => {
    try {
        let tvBoxUploader = await new TvBoxUploader(tvboxIp)

        await tvBoxUploader.action(data);
        return {
            status:"success",
            message:"推送成功"
        }
    } catch (error) {
        return {
            status:"error",
            message:"推送失败"
        }
    }
}


// (async()=>{
//     let data = await pushToAndroid();
//     console.log(data)
// })()





export default {
    pushToAndroid,
    actionToAndroid
};