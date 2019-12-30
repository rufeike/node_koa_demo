<!--
 * @Descripttion: 
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 09:17:52
 * @Email: rufeike@163.com
 -->

# Koa框架开发流程
>主要开发目录结构布置

## 开发项目常用模块
- koa 框架
- koa-static 静态文件读取模块
- koa-router 路由模块
- koa-ejs 模板渲染模块
- koa-session SESSION处理模块
- koa-better-body 表单处理模块 
    - get的参数绑点在ctx.request.params
    - post表单提交参数绑定在ctx.request.fields上(含文件)
- mysql mysql数据库模块
- co-mysql mysql数库封装同步模块
- await-fs 同步处理的的fs模块

```shell
npm install koa koa-static koa-router koa-ejs koa-session koa-better-body mysql co-mysql await-fs -D
```

## 目录结构
```html
├─libs                  公共模块目录
│  ├─common.js          公共配置文件模块 
│  ├─database.js        数据库启动配置目录模块 
│  └─...
├─log                   日志处理模块目录
├─node_modules          第三方模块目录模块
│  └─...
├─routers               路由相关模块（controller）
│  ├─admin              后台路由文件目录
│  │  ├─login           登录模块文件目录
│  │  │  ├─index.js     登录路由默认加载模块文件
│  │  │  └─...
│  │  ├─index.js        后台路由默认加载模块文件 
│  │  └─...
│  ├─api                接口路由文件目录
│  │  ├─index.js        接口路由默认加载模块文件 
│  │  └─...
│  ├─www                前台路由文件目录
│  │  ├─index.js        前台路由默认加载模块文件 
│  │  └─...
│  ├─static.js          静态文件控制器路由模块 
│  └─...
├─static                静态文件目录模块
│  ├─css                css文件目录
│  ├─images             图片文件目录 
│  ├─js                 js文件目录 
│  ├─upload             上传文件目录 
│  └─...
├─template
│  ├─admin              后台模板文件目录
│  ├─www                前台模板文件目录
│  └─...
├─upload                指定权限上传文件目录
├─.keys                 session秘钥文件
├─app.js                程序入口文件
├─config.js             程序配置文件
├─gen_key.js            session秘钥生产自定义程序
├─package.json          npm配置文件 
├─README.md             框架使用说明文档 
└─...

```


## 目录结构说明

### libs目录
>用于存储自定义的功能模块文件，如公共函数库文件，数据库启动模块等

### log目录
>用于放置系统日志文件，如系统错误日志，运行记录日志文件等

### routers目录
>用于存储路由文件（类似php框架中的controller）目录

#### index.js文件
>自定义模块引入，与后台admin默认加载`index.js`文件为例

代码：
```js
'use strict'
const KoaRouter = require('koa-router');
let router = new KoaRouter();

//默认后台首页
router.all('/',async (ctx,next)=>{
    ctx.body = "我是后台首页";
})

router.use('/login',require('./login'));


module.exports = router.routes();
```

#### static.js文件
>自定义静态文件加载规则，用于定义静态文件加载规则，如图片、css、js、html等文件的缓存时间等

调用方式``
```js
//引入该文件
const Router = require('koa-router');
const Static = require('./routers/static.js');
let router = new Router();
//router为路由实例化对象
Static(router,{image:30,script:1,styles:30,html:30,other:30});
```

代码：
```js
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

```


### static目录
>静态文件目录（类似php框架中的public）目录

### template目录
>渲染模板文件目录（类似php框架中的view）目录，主要配合`koa-ejs`进行使用

- koa-ejs注册
```js
const Ejs = require('koa-ejs');
//模板渲染
Ejs(app,{
    root:Path.resolve(__dirname,'template'),
    layout:false,
    viewExt:'html',
    cache:false,
    debug:false,
});
```

- koa-ejs调用
```js
router.get('/',async (ctx,next)=>{
    // console.log(ctx.url);
    await ctx.render('admin/login',{
        title:'登录'//模板传参
    });//使用Ejs渲染
})
```

- koa-ejs模板调用
```html
<%=title%>
```


### upload目录
>系统需要权限控制上传文件目录

### app.js
>程序启动文件（入口文件）

代码：
```js
'use strict'

const Koa = require('koa');
const Router = require('koa-router');//路由模块
const Static = require('./routers/static');//引入自定义静态文件模块
const Body = require('koa-better-body');//表单处理模块
const Path = require('path');//地址处理模块
const Session  = require('koa-session');//SESSION处理模块
const Fs = require('fs');//文件处理
const Ejs = require('koa-ejs');//模板渲染


const app = new Koa();
app.listen(8888,()=>{//监听端口
    console.log("Server 8888 is running...");
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
```

## config.js
>框架配置文件，如配置数据库，框架内部自定义的文件目录等

内容：
```js
module.exports = {
    //数据库相关
    DB_HOST:'localhost',
    DB_PORT:3306,
    DB_USER:'root',
    DB_PWD:'root',
    DB_NAME:'image',

    //http相关
    HTTP_PORT:8888,
    HTTP_ROOT:'http://localhost:8888'
};
```

## package.json
>npm按照依赖文件

内容：
```json
{
  "name": "node_koa",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "co-mysql": "^1.0.0",
    "koa": "^2.11.0",
    "koa-better-body": "^3.2.0",
    "koa-ejs": "^4.3.0",
    "koa-router": "^7.4.0",
    "koa-session": "^5.12.3",
    "koa-static": "^5.0.0",
    "mysql": "^2.17.1"
  }
}

```

### 其他文件
>其他开发辅助文件，如session安全keys组文件，生产keys文件的自定义小程序
- `.keys`文件
- `gen_key.js`生产`.keys`文件的小程序
```js
'use strict'
const fs = require('fs');

const KEY_LEN = 1024;//长度
const KEY_COUNT = 2048;//个数
const CHARS = 'abcdefghijklmnopqrstuvwtxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+<>?:"{}[]|';//随机字符

let arr = [];
for(let i=0;i<KEY_COUNT;i++){
    let key = '';
    for(let j=0;j<KEY_LEN;j++){
        key+=CHARS[Math.floor(Math.random()*CHARS.length)];
    }
    arr.push(key);
}

fs.writeFileSync('.keys',arr.join('\n'));
console.log('Key create success....');
```







