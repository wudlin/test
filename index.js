





//拷贝方法
var execute = require('./copyFile')
var gitCommit = require('./autoCommit');
execute('./src', './testCopy',callback=>{
    if (callback){
        console.log('创建成功');
        gitCommit('testCopy','测试提交')
    }else{
        console.log('创建失败');
    }
})

