/*
 * @Descripttion: 登录路由控制器
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 14:56:53
 * @Email: rufeike@163.com
 */
'use stict'
const KoaRouter = require('koa-router');
const AwaitFs = require('await-fs');//使用第三方同步读取文件await-fs
const Path = require('path');
const {md5} = require('../../../libs/common');//引入自定义类库

let router = new KoaRouter();

router.get('/',async (ctx,next)=>{
    await ctx.render('admin/login/index',{
        HTTP_HOST:ctx.config.HTTP_ROOT
    });//使用Ejs渲染
})

router.post('/',async (ctx,next)=>{
    let {username,userpass}= ctx.request.fields;
    let admins = JSON.parse(await AwaitFs.readFile(Path.resolve(__dirname,'../../../admins.json')));
    let admin =findAdmin(username);
    if(!username||!userpass){
        ctx.body = {code:0,msg:'用户名和密码不能为空！'};
    }else if(admin.length==0){
        ctx.body = {code:0,msg:'用户不存在！'};
    }else if(admin[0].password!=md5(userpass+ctx.config.ADMIN_PREFIX)){
        // console.log(admin[0].password);
        // console.log(md5(userpass+ctx.config.ADMIN_PREFIX));
        ctx.body = {code:0,msg:'密码错误！'};
    }else{
        //存在session 
        ctx.session['admin']=username;
        ctx.body = {code:200,msg:'登录成功'};
    }
    
    function findAdmin(username){
        return admins.filter(item=>{
            if(item.username===username){
                return true;
            }else{
                return false;
            }
        })
    }
})


module.exports = router.routes();
