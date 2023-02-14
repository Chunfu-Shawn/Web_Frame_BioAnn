import fs from "fs"
import { v1 as uuidv1 } from 'uuid'
import {annotationLogger, pad} from "../logSave.js";
import {poolReadWrite} from "../queue/createMysqlPool.js";


export function uploadRecord(ctx) {
    return new Promise((resolve, reject) => {
        try {
            // 获取上传时间
            const now = new Date()
            const uploadTimeP = now.toISOString()
            const YMD = String(now.getFullYear()) + pad(now.getMonth() + 1) + pad(now.getDate())
            const rid = uuidv1()
            let email, species, organ, tissue
            let genome = null
            let matrixFilePath = null
            let labelsFilePath = null
            let fragmentsFilePath = null
            let peakFilePath = null
            const title = ctx.request.body.title
            const type = ctx.request.body.type
            const resultPath = 'public/results/' + YMD + '/' + rid
            const uploadTime = uploadTimeP
            const screenFinishTime = null
            const annStartTime = null
            const annFinishTime = null
            const datasetID = null
            const sectionID = null
            const status = 'ready'
            // whether the request is to run demo
            if (ctx.request.body.isDemo === "false") {
                // read the uploaded form
                email = ctx.request.body.emailAddress === "undefined" ? "no email" : ctx.request.body.emailAddress
                species = ctx.request.body.species
                organ = ctx.request.body.organ
                tissue = ctx.request.body.tissue
                matrixFilePath = ctx.request.files['matrixFile'][0].destination + '/' +
                    ctx.request.files['matrixFile'][0].filename
                labelsFilePath = ctx.request.files['labelsFile'][0].destination + '/' +
                    ctx.request.files['labelsFile'][0].filename
                // 如果文件上传成功，转移文件到特定目录
                const dir = 'public/uploads/' + YMD +'/' + rid
                fs.mkdirSync(dir, {
                    //是否使用递归创建目录
                    recursive: true,
                })
                fs.rename(matrixFilePath, dir + '/' + ctx.request.files['matrixFile'][0].filename,
                    function (err) {
                        if (err) throw err;
                    });
                fs.rename(labelsFilePath, dir + '/' + ctx.request.files['labelsFile'][0].filename,
                    function (err) {
                        if (err) throw err;
                    });
                matrixFilePath = dir + '/' + ctx.request.files['matrixFile'][0].filename
                labelsFilePath = dir + '/' + ctx.request.files['labelsFile'][0].filename
                // if upload a multiomics job
                if (ctx.request.body.type === "multiomics") {
                    genome = ctx.request.body.genome
                    fragmentsFilePath = ctx.request.files['fragmentsFile'][0].destination + '/' +
                        ctx.request.files['fragmentsFile'][0].filename
                    fs.rename(fragmentsFilePath, dir + '/' + ctx.request.files['fragmentsFile'][0].filename,
                        function (err) {
                            if (err) throw err;
                        });
                    fragmentsFilePath = dir + '/' + ctx.request.files['fragmentsFile'][0].filename
                    // if peak file exists
                    if(ctx.request.files['peakFile'] !== undefined){
                        peakFilePath = ctx.request.files['peakFile'][0].destination + '/' +
                            ctx.request.files['peakFile'][0].filename
                        fs.rename(peakFilePath, dir + '/' + ctx.request.files['peakFile'][0].filename,
                            function (err) {
                                if (err) throw err;
                            });
                        peakFilePath = dir + '/' + ctx.request.files['peakFile'][0].filename
                    }
                }
            } else if (ctx.request.body.isDemo === "true") {
                // different example
                if( title === "Mouse fetal brain spatial cellular map"){
                    matrixFilePath = 'public/examples/Mouse_fetal_brain/counts.csv.gz'
                    labelsFilePath = 'public/examples/Mouse_fetal_brain/labels.csv.gz'
                    email = 'no email'
                    species = 'Mus musculus'
                    organ = 'Brain'
                    tissue = 'Brain'
                }else if( title === "Spatial distribution of cell types in mouse organogenesis") {
                    matrixFilePath = 'public/examples/Mammalian_organogenesis_3k_1/counts_3k.csv.gz'
                    labelsFilePath = 'public/examples/Mammalian_organogenesis_3k_1/labels_3k.csv.gz'
                    email = 'no email'
                    species = 'Mus musculus'
                    organ = 'Embryo'
                    tissue = 'Embryo'
                }else if( title === "Spatial patterning of human cutaneous squamous cell carcinoma") {
                    matrixFilePath = 'public/examples/Human_cSCC/counts.csv.gz'
                    labelsFilePath = 'public/examples/Human_cSCC/labels.csv.gz'
                    email = 'no email'
                    species = 'Homo sapiens'
                    organ = 'Skin'
                    tissue = 'Skin'
                }else if( title === "H3K4me3 modifications in mouse adult cortex and hippocampus") {
                    matrixFilePath = 'public/examples/Mouse_cortex_hippocampus_multiomics/counts.csv.gz'
                    labelsFilePath = 'public/examples/Mouse_cortex_hippocampus_multiomics/labels.csv.gz'
                    fragmentsFilePath = 'public/examples/Mouse_cortex_hippocampus_multiomics/fragment_file.bed.gz'
                    peakFilePath = 'public/examples/Mouse_cortex_hippocampus_multiomics/peak.bed.gz'
                    email = 'no email'
                    species = 'Mus musculus'
                    genome = "mm10"
                    organ = 'Brain'
                    tissue = 'Brain'
                }else {
                    reject(`[${new Date().toLocaleString()}] Error: Example job title is wrong in request body.`)
                }
            } else {
                reject(`[${new Date().toLocaleString()}] Error: There is wrong in request body.`)
            }

            //创建输出目录
            fs.mkdirSync(resultPath, {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/log', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/out/pdf', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/out/table', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/out/json', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.writeFileSync(resultPath + "/request.json",
                JSON.stringify(ctx.request) + '\n',
                {flag: "w"}
            );

            // 使用 connection.query() 的查询参数占位符，在其内部对传入参数的自动调用connection.escape()方法进行编码，防止sql注入
            let insertSql = `INSERT INTO users_annotation_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
            // 连接mysql连接池
            poolReadWrite.getConnection((err, connection)=>{
                if(err){
                    reject(err)
                }
                connection.query(insertSql, [rid, title, email, species, genome, organ, tissue, matrixFilePath, labelsFilePath,
                    fragmentsFilePath, peakFilePath, resultPath, uploadTime, screenFinishTime, annStartTime, annFinishTime,
                    datasetID, sectionID, type, status], (err) => {
                        if (err) {
                            annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Adding a annotation record failed in MySQL: ${err.message}`)
                        } else {
                            annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: Add a record into MySQL successfully.`)
                        }
                    })
                connection.release()
            })
            resolve([rid, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath])
        } catch (err) {
            reject(err)
        }
    })
}