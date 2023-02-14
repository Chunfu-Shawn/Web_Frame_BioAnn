import {annotationLogger} from "./logSave.js";
import fs from "fs";
import {removePromise} from "./one-week-files-delete.js";

export default function removeUploadFiles(rid, resultPath) {
    try {
        const tmp = resultPath.split('/').map(item => {
            if (item === "results") return "uploads"
            else return item
        })
        const uploadPath = tmp.join('/')
        if(fs.existsSync(uploadPath)) {
            removePromise(uploadPath).then(
                annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: removed uploaded files of ${resultPath.split('/')[3]}`)
            )
        }else {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: uploaded files of ${resultPath.split('/')[3]} not exist !`)
        }
    }catch (e){
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: removing uploaded files of ${resultPath.split('/')[3]} fail !`)
    }
}