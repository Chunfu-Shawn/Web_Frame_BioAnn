import {annotationLogger} from "../logSave.js";
import {poolReadWrite} from "../queue/createMysqlPool.js";

export function setJobMappingInfo(rid, datasetId, sectionId) {
    return new Promise( (resolve, reject)=>{
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let updateSql = `UPDATE users_annotation_records SET dataset_id=?, section_id=? WHERE rid=?;`;
        // 连接mysql连接池
        poolReadWrite.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(updateSql, [datasetId, sectionId, rid], (err) => {
                if (err) {
                    annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: there is error happened in MySQL: ${err.message}`)
                    reject(err)
                } else {
                    annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: Add reference dataset and section in MySQL.`)
                    resolve()
                }
            });
            connection.release();
        });
    })
}