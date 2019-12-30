/*
 * @Descripttion: 
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 10:04:58
 * @Email: rufeike@163.com
 */
'use strict'

const KoaStatic = require('koa-static');

module.exports = function(router,options){
    options = options||{};
    options.image = options.image||30;
    options.script = options.script||1;
    options.styles = options.styles||30;
    options.html = options.html||30;
    options.other = options.other||7;
    // console.log(options);
    //图片文件缓存30天
    router.all(/((\.jpg)|(\.png)|(\.gif))$/i,KoaStatic('./static',{
        maxage:options.image*86400*1000
    }));

    //.js和.jsx文件缓存1天
    router.all(/((\.js)|(\.jsx)$)/i,KoaStatic('./static',{
        maxage:options.script*86400*1000
    }))

    //css文件缓存30天
    router.all(/(\.css)$/i,KoaStatic('./static',{
        maxage:options.styles*86400*1000
    }))

    //网页文件缓存30天
    router.all(/((\.html)|(\.htm))$/i,KoaStatic('./static',{
        maxage:options.html*86400*1000
    }))

    //其他缓存7天
    router.all('*',KoaStatic('./static',{
        maxage:options.other*86400*1000
    })) 
}