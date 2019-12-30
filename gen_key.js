/*
 * @Descripttion: 生成随机key小工具
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 11:10:52
 * @Email: rufeike@163.com
 */
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