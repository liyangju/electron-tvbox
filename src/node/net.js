const os = require('os');
const net = require('net');


// 获取本机的 IP 地址
const getLocalIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
};

// 扫描局域网上所有 IP 地址的指定端口
const scanPort = async (ip, port) => {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();
        socket.setTimeout(1000); // 1秒钟连接超时

        socket.on('connect', () => {
            socket.destroy();
            resolve(ip);
        });

        socket.on('timeout', () => {
            socket.destroy();
            reject();
        });

        socket.on('error', () => {
            socket.destroy();
            reject();
        });

        socket.connect(port, ip);
    });
};

// 查找1-255端口号位9978的可用的ip
const scanLocalNetwork = (port) => {
    const localIpAddress = getLocalIpAddress();
    const promises = [];

    for (let i = 1; i <= 255; i++) {
        const ip = `${localIpAddress.slice(0, localIpAddress.lastIndexOf('.'))}.${i}`;
        promises.push(scanPort(ip, port));
    }

    return Promise.allSettled(promises)
        .then((results) => {
            const ips = results
                .filter(result => result.status === 'fulfilled')
                .map(result => `http://${result.value}:${port}`);
            return ips;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
}


const getIps = async()=> {
    try{
        const ips = await scanLocalNetwork("9978")
        console.log(ips)
        if (ips.length) {
            return {
                status:"success",
                message:'已找到可用设备',
                ips:ips
            }
        } else {
            return {
                status:"error",
                message:'未找到可用设备,请在手机或电视打开TVBOX',
                ips:ips
            }
        }
    }catch(error){
        return {
            status:"error",
            message:'查找设备出错，请重试',
            ips:[]
        }
    }
}



export default {
    getIps
};