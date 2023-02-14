import {poolReadWrite} from "./createMysqlPool.js";


export function insertWaitingJob(rid) {
    return new Promise( (resolve, reject)=>{
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let insertSql = `insert into job_mapping_queue_test(rid) values(?)`;
        // 连接mysql连接池
        poolReadWrite.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(insertSql, [rid], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
            connection.release();
        });
    })
}
