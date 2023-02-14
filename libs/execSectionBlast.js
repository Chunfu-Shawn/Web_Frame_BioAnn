import fs from "fs"
import child_process from 'child_process';
import {annotationLogger} from "./logSave.js";
import {setJobStatus} from "./record/setJobStatus.js";
import removeUploadFiles from "./removeUploadFiles.js";
import {setJobTime} from "./record/setJobTime.js";

export async function execSectionBlast(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath,
                                       nThreads = 30) {
    const stScreening = 'scripts/ST_screening/ST_screening.sh'
    const command =
        "bash " + stScreening +
        " --count " + matrixFilePath +
        " --label " + labelsFilePath +
        " --key_celltype " + "cell_type" +
        " --datasets " + datasets +
        " --sections " + sections +
        " --n_threads " + nThreads +
        " --outDir " + resultPath +
        " >" + resultPath + "/log/ST_screening.log" +
        " 2>" + resultPath + "/log/Error.log"
    // 执行注释脚本
    if (!fs.existsSync(stScreening)) {
        //如果python脚本不存在
        // 改变任务状态为running，设置任务开始时间
        await setJobStatus(rid, "error")
        await setJobTime(rid, "screen_finish_time")
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: ST screening script not found !`)
    } else if (!fs.existsSync(matrixFilePath) && !fs.existsSync(labelsFilePath)) {
        //如果空间数据不存在
        await setJobStatus(rid,  "error")
        await setJobTime(rid, "screen_finish_time")
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: scRNA-seq data not found !`)
    } else {
        try {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: ST screening running...`)
            // 改变任务状态为screening，设置任务开始时间
            await setJobStatus(rid,  "screening")
            await setJobTime(rid, "upload_time")
            const screenProcess = child_process.exec(command)
            // 监听screenProcess任务的exit事件，如果发生则调用listener
            screenProcess.on('exit', function (code) {
                annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: child process 'ST screening' has exited，exit code: ${code}`)
                if (code === 0)
                    setJobStatus(rid,  "selecting")
                else {
                    setJobStatus(rid,  "error")
                    removeUploadFiles(rid, resultPath)
                }
                setJobTime(rid, "screen_finish_time")
            })
        } catch(err) {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}