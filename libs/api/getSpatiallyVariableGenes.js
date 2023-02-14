import {poolReadOnly} from "../queue/createMysqlPool.js";


export async function getSpatiallyVariableGenes(geneOrSection,param) {
    return new Promise((resolve, reject) => {
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql
        // 加上BINARY区分大小写
        if(geneOrSection === "gene") selectSql =
            `SELECT sv.*,d.id,d.organ_tissue FROM sections_info as d 
             RIGHT JOIN (SELECT * FROM spatially_variable_genes WHERE BINARY gene_symbol=?) as sv
             ON BINARY d.section_id = sv.section_id`
        else selectSql =
            `SELECT sv.*,g.ensembl_id FROM genes_info as g RIGHT JOIN (SELECT * from spatially_variable_genes 
             WHERE section_id=?) as sv ON BINARY sv.gene_symbol = g.symbol`

        // 连接mysql连接池
        poolReadOnly.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(selectSql, [param], (err, result) => {
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