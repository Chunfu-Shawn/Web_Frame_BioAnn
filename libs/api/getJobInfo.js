import {poolReadOnly} from "../queue/createMysqlPool.js";


export function getJobInfo(rid) {
    return new Promise(async (resolve, reject) => {
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql = `SELECT * FROM users_annotation_records WHERE rid=?`
        // 根据rid查询任务状态
        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql, [rid], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({...JSON.parse(JSON.stringify(result))[0]})
                }
            });
            connection.release();
        });
    })
}