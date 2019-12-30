/*
 * @Descripttion: 数据库连接
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 11:30:13
 * @Email: rufeike@163.com
 */
'use strict'
const Mysql = require('mysql');
const CoMysql = require('co-mysql');
const {DB_HOST,DB_NAME,DB_PORT,DB_PWD,DB_USER} = require('../config');

let conn = Mysql.createPool({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PWD,
    database:DB_NAME,
    port:DB_PORT
});

module.exports = CoMysql(conn);