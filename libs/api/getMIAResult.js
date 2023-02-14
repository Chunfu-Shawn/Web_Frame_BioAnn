import fs from "fs"

export async function getMIAResult(resultPath){
    return new Promise(async (resolve, reject) => {
        try {
            const MIA = fs.readFileSync(
                resultPath + '/out/json/MIA.json', 'utf8');
            const datasetsInfo = fs.readFileSync(
                resultPath + '/out/json/datasets_info.json', 'utf8');
            let data = JSON.parse(MIA)
            data.datasets_info = JSON.parse(datasetsInfo)
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}