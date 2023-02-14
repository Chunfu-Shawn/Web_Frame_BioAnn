import {poolReadWrite} from "./createMysqlPool.js";


export function updateJob2Running(rid) {
    return new Promise( (resolve, reject)=>{
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let updateSql = `UPDATE job_mapping_queue_test SET status = 'running', version = version + 1 
                        WHERE version = "0" AND rid = ?`;
        // 连接mysql连接池
        poolReadWrite.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(updateSql, [rid], (err,result) => {
                if (err) {
                    reject(err)
                } else {
                    // 如果更新失败 0条记录影响
                    let res = JSON.parse(JSON.stringify(result))
                    if (res.affectedRows === 1)
                        resolve()
                    else reject(`job ${rid} has already been running`)
                }
            });
            connection.release();
        });
    })
}
