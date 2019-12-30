/*
 * @Descripttion: 程序入口
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 09:16:35
 * @Email: rufeike@163.com
 */
'use strict'

const Koa = require('koa');
const Router = require('koa-router');//路由模块
const Static = require('./routers/static');//引入自定义静态文件模块
const Body = require('koa-better-body');//表单处理模块
const Path = require('path');//地址处理模块
const Session  = require('koa-session');//SESSION处理模块
const Fs = require('fs');//文件处理
const Ejs = require('koa-ejs');//模板渲染
const Config = require('./config');//引入自定义配置文件


const app = new Koa();
app.listen(Config.HTTP_PORT,()=>{//监听端口
    console.log(`Server ${Config.HTTP_PORT} is running...`);
})

//中间件引入
app.use(Body({//表单处理
    uploadDir:Path.resolve(__dirname,'./static/upload'),//指定默认文件上传目录
}));


//session轮询keys 使用自定义程序生成的keys
app.keys=Fs.readFileSync('.keys').toString().split('/n');
app.use(Session({
    maxAge:20*60*1000,//有效期
    renew:true//自动续签
},app));

//数据库
app.context.db = require('./libs/database');//把自定义的数据库查询模块得到的数据库查询query方法绑定道app.context的db属性

//把配置文件加载道ctx.context.config中
app.context.config = Config;

//模板渲染
Ejs(app,{
    root:Path.resolve(__dirname,'template'),
    layout:false,
    viewExt:'html',
    cache:false,
    debug:false,
});


//统一处理
app.use(async (ctx,next)=>{
    try{
        await next();
    }catch(e){
        console.log(e);
        ctx.status = 500;
        ctx.body = 'Internaal Server Error';
    }
});

let router = new Router();
router.use('/admin',require('./routers/admin'));//后台路由注册
router.use('/api',require('./routers/api'));//api路由注册
router.use('',require('./routers/www'));//前台路由路由注册
Static(router,{image:30,script:1,html:30,styles:30,other:7});//静态路由注册

app.use(router.routes());//挂载路由