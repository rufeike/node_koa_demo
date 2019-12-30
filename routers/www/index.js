/*
 * @Descripttion:前台路由
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 10:05:20
 * @Email: rufeike@163.com
 */
'use strict'
const KoaRouter = require('koa-router');
let router = new KoaRouter();

router.all('/',async (ctx,next)=>{
    ctx.body = "前台首页";
})

router.all('/login',async (ctx,next)=>{
    ctx.body = "我是前台登录";
})

module.exports = router.routes();

