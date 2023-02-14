import fs from "fs";
import {annotationLogger} from "./logSave.js";

export default function copyExampleFiles(rid, matrixFilePath, resultPath){
    try{
        // exampleFilesPath end with "/"
        let exampleFilesPath = matrixFilePath.substring(0, matrixFilePath.lastIndexOf('/') + 1)
        // resultPath end without "/"
        // copy example files
        fs.copyFileSync(exampleFilesPath+"sc.h5ad",resultPath+"/sc.h5ad")
        fs.copyFileSync(exampleFilesPath+"sc_markers.json",resultPath+"/out/json/sc_markers.json")
        fs.copyFileSync(exampleFilesPath+"meta_info.preprocessing.json",resultPath+"/out/json/meta_info.preprocessing.json")
        fs.copyFileSync(exampleFilesPath+"filter_summary.preprocessing.json",resultPath+"/out/json/filter_summary.preprocessing.json")
    }catch (e){
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Copy example files failed: ${e}`)
    }
}