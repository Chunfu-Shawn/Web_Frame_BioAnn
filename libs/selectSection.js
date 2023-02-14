import mysql from 'mysql'
import fs from "fs";
// 数据库的配置选项
const options = {
    host: 'localhost',//主机名
    user: 'readonly',//用户
    password: 'access',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export function selectSection(resultPath,species,organ,tissue){
    let connection = mysql.createConnection(options)
    // 连接数据库
    connection.connect()
    // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
    let selectSql = `SELECT * FROM datasets_info WHERE species=? AND organ=? AND tissue=?`

    //查询
    return new Promise((resolve, reject) => {
        connection.query(selectSql,[species,organ,tissue],(err, result) => {
            if(err){
                console.log(err.message);
                reject(err);
            }
            // get datasets id
            const dataTmp = []
            result.forEach( item => {
                for(let i =0; i < item.section_id.split(',').length; i++)
                {
                    dataTmp.push(item.id)
                }
            })
            const datasets = dataTmp.join(",")

            // get sections id
            const sections = result.map( item => {
                return(
                    item.section_id.split(',').join(",")
                )
            }).join(",")

            // write datasets info into file
            fs.writeFileSync(resultPath + "/out/json/datasets_info.json",
                JSON.stringify(result) + '\n',
                {flag: "w"}
            );
            resolve([datasets,sections])
        })
        connection.end()
    })
}