import multer from '@koa/multer'


const deleteSpecificChar = (str) => {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;,\\[\\]<>/?！￥…（）—【】；：”“。，、？]");
    let rs = "";
    for (let i = 0; i < str.length; i++) {
        rs = rs + str.substring(i, i+1).replace(pattern, '');
    }
    return rs
}

export function uploadFile() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const tmpDir = 'public/uploads/tmp'
            cb(null, tmpDir)
        },
        filename: function (ctx, file, cb) {
            cb(null, deleteSpecificChar(file.originalname))
        }
    })
    const limits = {
        fields: 12,//非文件字段的数量
        fileSize: 200 * 1024 * 1024,//文件大小 单位 Byte
        files: 4//文件数量
    }

    return multer({storage,limits})
}