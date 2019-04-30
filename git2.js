'use strict'

const fs = require('fs')
const simpleGit = require('simple-git')

// 定时器
setInterval(function () {
    upDataFile()
}, 1000 * 60 * 60) //时间不易太短

// 修改 README 文件
upDataFile()
function upDataFile() {
    const time = Date()
    fs.appendFile(__dirname + '/README.md', '#### 自动 commit，时间:' + time + '\r\n', err => {
        err ? console.error('缺少 README.md ') : console.log('README 文件追加成功，时间: ' + time)
        gitCommit(time)
    })
}

// commit 提交
function gitCommit(time) {
    simpleGit()
        .add('./*')
        // .add('text.txt')
        .commit('自动 commit，时间' + time)
        .pull(['--release', 'origin', 'develop'], (e) => {
            console.log('拉起 分支成功，时间：' + time)
        })
        .push(['-u', 'origin', 'develop'], (e) => {
            console.log('commit 成功，时间：' + time)
        })
}