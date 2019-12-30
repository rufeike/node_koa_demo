/*
 * @Descripttion: api路由
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 10:05:20
 * @Email: rufeike@163.com
 */
'use strict'
const KoaRouter = require('koa-router');
let router = new KoaRouter();

router.all('/',async (ctx,next)=>{
    ctx.body = "我是api模块";
})

module.exports = router.routes();

