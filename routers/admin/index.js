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

//登录入口
router.use('/login',require('./login'));//注意login模板必须放在权限之前

//后台统一权限处理
router.all('*',async (ctx,next)=>{
    console.log(ctx.url);
    try{
        if(ctx.session['admin']) {//判读是否登录
            await next();
        }else{
            ctx.redirect(`${ctx.config.HTTP_HOST}/admin/login`);
        }
    }catch(e){
        console.log(e);
        ctx.status = 500;
        ctx.body = 'Internaal Server Error';
    }
});

//默认后台首页
router.all('/',async (ctx,next)=>{
    //获取栏目
    let db = ctx.db;
    let sql = "SELECT * FROM `yd_cate` WHERE `parent_id`=0 ORDER BY `sort`";
    let cate = await db.query(sql);

    //需要异步处理map
    let subCate =  await Promise.all(cate.map(async item=>{
        let sql = "SELECT * FROM `yd_cate` WHERE `parent_id`="+item.cate_id+" ORDER BY `sort`";
        item.sub = await db.query(sql);
        return await item;
    }));



    await ctx.render('admin/index',{
        HTTP_HOST:ctx.config.HTTP_ROOT,
        admin:ctx.session.admin,
        cate:subCate
    });//使用Ejs渲染


})

//后台欢迎页面
router.all('/welcome',async (ctx,next)=>{
    await ctx.render('admin/welcome',{
        HTTP_HOST:ctx.config.HTTP_HOST,
        admin:ctx.session.admin,
    });//使用Ejs渲染
})

router.use('/link',require('./link'));//引入友情连接模块路由


module.exports = router.routes();

