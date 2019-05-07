'use strict'

const fs = require('fs')
const simpleGit = require('simple-git')

// // 定时器
// // setInterval(function () {
// //     upDataFile()
// // }, 1000 * 60 * 60) //时间不易太短

// // 修改 README 文件
// upDataFile()
// function upDataFile() {
//     const time = Date()
//     fs.appendFile(__dirname + '/README.md', '#### 自动 commit，时间:' + time + '\r\n', err => {
//         err ? console.error('缺少 README.md ') : console.log('README 文件追加成功，时间: ' + time)
//         gitCommit(time)
//     })
// }

// commit 提交12
function gitCommit(src,commitMSG) {
    simpleGit()
        // .init()
        // .addRemote('origin', 'git@github.com:wudlin/test.git')
        // .add('./*',()=>{
        //     console.log('add成功');            
        // })
        .add(src, () => {
            console.log(src+'add成功');
        })
        // .add('text.txt')
        .commit(commitMSG ? commitMSG : Date(), () => {
            console.log('commit 成功')
        })
        .push(['-u', 'origin', 'master'], (err) => {
            if (err) {
                //有冲突
                simpleGit().pull(['--release', 'origin', 'master'], (e) => {
                    console.log('拉起成功')
                })
            } else {
                console.log(src+'push 成功' )
            }
        })
}
module.exports = gitCommit;