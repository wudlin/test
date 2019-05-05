import express from 'express'

const router = express.Router() // 路由
// 配置路由
router.get('/', function (req, res) {
    res.send('hello world')
})

export default router
