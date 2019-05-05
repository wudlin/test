// import express from 'express'
// import router from './router' //引入路由配置文件

// const app = express()
// // 使用路由
// app.use('', router)

// app.listen(3000, () => console.log('浏览器输入http://localhost:3000'))
// import { execCMD } from './cmd';
import { upDataFile, gitCommit } from './git';
//执行安装命令
// const cmd = 'npm install';
// execCMD(cmd);
//执行git自动提交脚本
// upDataFile();
gitCommit('111');