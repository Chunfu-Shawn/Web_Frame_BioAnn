import fs from "fs"

// 单区间的getRange
function getRange(str) {
    const token = str.split('=')
    if (!token || token.length !== 2 || token[0] !== 'bytes') {
        return null
    }
    return token[1].split('-').map(
        val => {
            if (val === '') {
                return Infinity
            }
        return Number(val)
    })
}

// process Range bytes:xxx-xxx
export async function getDatasetJsonl(ctx, resultPath, fileName){
    return new Promise( async (resolve, reject) => {
        try {
            const { size } = fs.statSync(resultPath + fileName);
            const range = ctx.headers['range'];
            if (!range) {
                ctx.set('Accept-Ranges', 'bytes');
                ctx.body = fs.readFileSync(resultPath + fileName);
                resolve();
            }
            const [ start, end ] = getRange(range);
            if (start >= size || end >= size) {
                ctx.response.status = 416;
                ctx.body = '';
                resolve();
            }
            ctx.response.status = 206;
            ctx.set('Accept-Ranges', 'bytes');
            ctx.set('Content-Range', `bytes ${start}-${end ? end : size - 1}/${size}`);
            ctx.body = fs.createReadStream(resultPath + fileName, { start, end });
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}