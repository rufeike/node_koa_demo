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
    // console.log(cate);

    await ctx.render('admin/index',{
        HTTP_HOST:ctx.config.HTTP_ROOT,
        admin:ctx.session.admin,
        cate:cate
    });//使用Ejs渲染
})



module.exports = router.routes();

