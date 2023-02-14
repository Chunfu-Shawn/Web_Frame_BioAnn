import {poolReadOnly} from "../queue/createMysqlPool.js";


export function getExpressionRankScore(geneName) {
    return new Promise((resolve, reject) => {
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql
        // 加上BINARY区分大小写
        selectSql =
            `SELECT pe.*,pe.section_id,d.organ_tissue FROM sections_info as d 
             RIGHT JOIN (SELECT * FROM pseudobulk_expression WHERE BINARY gene_symbol=?) as pe
             ON BINARY d.section_id = pe.section_id`

        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql, [geneName], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(JSON.stringify(result)))
                }
            });
            connection.release();
        });
    })
}