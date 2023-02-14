import {poolReadOnly} from "./createMysqlPool.js";


export function getPriorWaitingJob() {
    return new Promise( (resolve, reject)=>{
        let selectSql = `select rid from job_mapping_queue_test where status="waiting" limit 1`;
        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql,  (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(JSON.stringify(result))[0])
                }
            });
            connection.release();
        });
    })
}
