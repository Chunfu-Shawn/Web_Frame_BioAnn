import mysql from "mysql";

const optionsReadOnly = {
    host: 'localhost',//主机名
    user: 'readonly',//用户
    password: 'access',//密码
    port: 3306,//端口号
    database: 'web_frame'//要操作的数据库
}

const optionsReadWrite = {
    host: 'localhost',//主机名
    user: 'readwrite',//用户
    password: 'mysql_update',//密码
    port: 3306,//端口号
    database: 'web_frame'//要操作的数据库
}

export const poolReadOnly = mysql.createPool(optionsReadOnly)
export const poolReadWrite = mysql.createPool(optionsReadWrite)