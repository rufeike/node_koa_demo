/*
 * @Descripttion: 后台路由
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 10:05:20
 * @Email: rufeike@163.com
 */
'use strict'
const KoaRouter = require('koa-router');
let router = new KoaRouter();

//默认后台首页
router.all('/',async (ctx,next)=>{
    ctx.body = "我是后台首页";
})

router.use('/login',require('./login'));


module.exports = router.routes();

