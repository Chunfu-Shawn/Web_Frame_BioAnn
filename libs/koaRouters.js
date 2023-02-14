// 导入router路由middleware
import router from 'koa-router'
import {uploadFile} from "./uploadFile.js"
import {uploadRecord} from "./record/uploadRecord.js"
import {annotationLogger} from "./logSave.js";
import {selectSection} from "./selectSection.js";
import {execSectionBlast} from "./execSectionBlast.js";
import {setJobMappingInfo} from "./record/setJobMappingInfo.js";
import copyExampleFiles from "./copyExampleFiles.js";
import {setJobStatus} from "./record/setJobStatus.js";
import {setJobParams} from "./record/setJobParams.js";


export const Router = router()
// 设置路由，与next.js的路由进行映射

const SectionBlast = async (ctx) => uploadRecord(ctx).then(
    async ([rid, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath]) => {
        ctx.body = {rid: rid}
        annotationLogger.log(`>>> ${rid}:[${new Date().toLocaleString()}]: upload data`)
        // run sections matching species, organ and tissue
        const [datasets, sections] = await selectSection(resultPath, species, organ, tissue)
        return ([rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath])
    }).then(
    ([rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath]) => {
        // run section blast
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: start section blast`)
        execSectionBlast(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath)
    }).catch((err)=>{
    annotationLogger.log(`[${new Date().toLocaleString()}] Error: A bad upload happened: ${err}`)
})

// scRNA-seq上传文件的路由
Router.post('/mapping/scRNA-seq',
    uploadFile().fields([
        {name: 'matrixFile', maxCount: 1},
        {name: 'labelsFile', maxCount: 1},
    ]), SectionBlast )

// multi-omics上传文件的路由 含有peak文件
Router.post('/mapping/multiomics',
    uploadFile().fields([
        {name: 'matrixFile', maxCount: 1},
        {name: 'labelsFile', maxCount: 1},
        {name: 'fragmentsFile', maxCount: 1},
        {name: 'peakFile', maxCount: 1},
    ]), SectionBlast )

// run audition 的路由
Router.post('/mapping/demo', async (ctx) => uploadRecord(ctx).then(
    async ([rid, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath]) => {
        ctx.body = {rid: rid}
        annotationLogger.log(`>>> ${rid}:[${new Date().toLocaleString()}]: run example`)
        // copy processed example files to improve efficiency
        copyExampleFiles(rid, matrixFilePath, resultPath)
        // run sections matching species, organ and tissue
        const [datasets, sections] = await selectSection(resultPath, species, organ, tissue)
        return ([rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath])
    }).then(
    ([rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath]) => {
        // run section blast
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: start section blast`)
        execSectionBlast(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath)
    })
    .catch((err)=>{
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: A bad upload happened: ${err}`)
    })
)

// run mapping 的路由
Router.post('/mapping/annotate', async (ctx) => {
        try {
            const { rid, datasetId, sectionId, knnNum, numSpots, numCells, numRedundancy, bandWidth, cutoff }
                = ctx.request.body
            await setJobMappingInfo(rid, datasetId, sectionId)
            await setJobParams(rid, knnNum, numSpots, numCells, numRedundancy, bandWidth, cutoff)
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: start mapping`)
            // 运行Tangram, 传入Koa的context包装的request对象，和response对象
            await setJobStatus(rid,  "waiting")
            await insertWaitingJob(rid);
        } catch (err) {
            annotationLogger.log(`[${new Date().toLocaleString()}] Error: There is a wrong happened in Spatial Mapping: ${err}`)
        }
    }
)
