// import { execCMD } from './cmd';
// import { upDataFile } from './git';
// //执行安装命令
// const cmd = 'npm install';
// execCMD(cmd);
// //执行git自动提交脚本
// upDataFile();
require('babel-register')({
    presets: ['env']
})

// 导入初始的启动文件
module.exports = require('./server.js')