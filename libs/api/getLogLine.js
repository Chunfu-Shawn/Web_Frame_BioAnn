import fs from "fs"
import readLine from "readline"

export async function getLogLine(resultPath,filePath){
    return new Promise(async (resolve, reject) => {
        try {
            const fReadName = resultPath + filePath
            let dataArr = [];
            let readObj = readLine.createInterface({
                input: fs.createReadStream(fReadName)
            });

            readObj.on('line', function (line) {
                dataArr.push(line);
            });
            readObj.on('close', function () {
                resolve(dataArr)
            })
        } catch (err) {
            reject(err)
        }
    })
}