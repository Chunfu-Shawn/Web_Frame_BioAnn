import {poolReadOnly} from "./createMysqlPool.js";


export function getRunningJobNumber() {
    return new Promise( (resolve, reject)=>{
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let countSql = `select COUNT(id) as running_job_number from job_mapping_queue_test where status="running"`;
        // 连接mysql pool
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(countSql,  (err,result) => {
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
