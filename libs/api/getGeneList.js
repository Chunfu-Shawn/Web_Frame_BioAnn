import {poolReadOnly} from "../queue/createMysqlPool.js";


export function getGeneList(species,idType,geneName) {
    return new Promise((resolve, reject) => {
        let selectSql = ''
        let geneIdType = ''
        // 判断基因名类型
        if (idType === "Symbol") {
            // 判断物种
            // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
            if (species === "All") selectSql = `SELECT * FROM genes_info WHERE symbol like ? OR name_synonyms like ?`;
            else if (species === "Human") selectSql = `SELECT * FROM genes_info WHERE symbol like ? OR name_synonyms like ? 
                                                    AND organism = 'Homo sapiens'`;
            else selectSql = `SELECT * FROM genes_info WHERE symbol like ? OR name_synonyms like ? AND organism = 'Mus musculus'`;
            // 连接mysql连接池
            poolReadOnly.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(selectSql, [`%${geneName}%`, `%${geneName}%`], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)))
                    }
                });
                connection.release();
            });

        } else {
            if (idType === "Ensembl") geneIdType = 'ensembl_id'
            else geneIdType = 'entrez_id'
            // 判断物种
            // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
            if (species === "All") selectSql = `SELECT * FROM genes_info WHERE ${geneIdType} like ?`;
            else if (species === "Human") selectSql = `SELECT * FROM genes_info WHERE ${geneIdType} like ? AND organism = 'Homo sapiens'`;
            else selectSql = `SELECT * FROM genes_info WHERE ${geneIdType} like ? AND organism = 'Mus musculus'`;
            // 连接mysql连接池
            poolReadOnly.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(selectSql, [`%${geneName}%`], (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)))
                    }
                });
                connection.release();
            });
        }
    })
}