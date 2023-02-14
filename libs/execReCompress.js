import fs from "fs"
import child_process from 'child_process';
import {annotationLogger} from "./logSave.js";

export function execReCompress(rid, resultPath) {
    const resCompress = 'scripts/NicheAnchor/compress_results.sh'
    const command =
        "bash " + resCompress +
        " --outDir " + resultPath +
        " >"+ resultPath + "/log/result_compression.log"

    if (!fs.existsSync(resCompress)) {
        //如果python脚本不存在
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: results compression script not found !`)
    } else  {
        try {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: results compression running...`)
            let resCompressProcess = child_process.exec(command)
            // 监听screenProcess任务的exit事件，如果发生则调用listener
            resCompressProcess.on('exit', function (code) {
                if (code === 0)
                    annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: results compression finished`)
                else
                    annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: results compression failed`)
            });
        } catch (err) {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}