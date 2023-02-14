/**
 * NodeJs remove the upload files and mapping results created a week age
 */

import fs from 'fs';
import path from 'path';


/**
 * Remove a folder
 * @param {String} fromDir target directory
 */

async function removeFolder(fromDir) {
    const nowMs = new Date()
    let filesData = [];
    if (!fs.existsSync(fromDir)) {
        console.log('path not exists: ', fromDir);
        return filesData;
    }
    filesData = fs.readdirSync(fromDir, (err, files) => {
        if (err) throw err;
        return files
    })
    filesData.forEach( item =>{
        //stat file or directory information
        const result =  fs.statSync(fromDir + item)
        console.log(item.indexOf("tmp"))
        // remove directories which are created one week ago
        if (Math.floor((nowMs-result.ctimeMs)/(24*3600*1000)) > 7 && item.indexOf("tmp")!==0)
            // Before deleting a folder, clear all files in the target folder recursively
            removePromise(fromDir + item)
    })
}

/**
 * clear a folder recursively
 * @param {String} dir target directory
 */
export function removePromise(dir) {
    return new Promise(function (resolve, reject) {
        //先读文件夹
        fs.stat(dir,function (err, stat) {
            if(stat.isDirectory()){
                fs.readdir(dir,function (err, files) {
                    files = files.map(file=>path.join(dir,file)); // a/b  a/m
                    files = files.map(file=>removePromise(file)); //这时候变成了promise
                    Promise.all(files).then(function () {
                        fs.rmdir(dir,resolve);
                    })
                })
            }else {
                fs.unlink(dir,resolve)
            }
        })

    })
}

export default function rmFiles(DIR_PATH_RESULTS,DIR_PATH_UPLOADS){
    // remove results
    removeFolder(DIR_PATH_RESULTS).then(()=>{
        console.log("Successfully remove the folders of results created one week age!")
    }).catch(e=>console.log("error: ",e))

    // remove upload files
    removeFolder(DIR_PATH_UPLOADS).then(()=>{
        console.log("Successfully remove the folders of upload files created one week age!")
    }).catch(e=>console.log("error: ",e))
}