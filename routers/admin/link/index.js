/*
 * @Descripttion: 友情连接
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-31 14:17:28
 * @Email: rufeike@163.com
 */
'use strict'

const KoaRouter = require('koa-router');
let router = new KoaRouter();
console.log(__dirname);
router.get('/',async (ctx,next)=>{
    await ctx.render('admin/link/index',{
        
    });
})

module.exports = router.routes();