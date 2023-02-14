import fs from "fs"
import mime from "mime-types";

export async function getDatasetImage(ctx, resultPath, fileName){
    return new Promise( async (resolve, reject) => {
        try {
            const image = fs.readFileSync(resultPath + "images/" + fileName);
            let mimeType = mime.lookup(resultPath + "images/" + fileName); //读取图片文件类型
            ctx.set('content-type', mimeType); //设置返回类型
            ctx.body = image; //返回图片
            resolve(image)
        } catch (err) {
            reject(err)
        }
    })
}