import fs from "fs";
import {v1 as uuidv1} from "uuid";

export default function preUpload(name,file){
    const uuid = uuidv1()
    const dir = 'public/uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
        +'/' + uuid
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true})
    }
    // 文件名称去掉特殊字符但保留原始文件名称
    console.log(name,file)
    const fileName = file.originalFilename
        .replaceAll(" ", "_")
        .replace(/[`~!@#$%^&*()|\-=?;:'",<>\{\}\\\/]/gi, "_");
    file.originalFilename = fileName;
    // 覆盖文件存放的完整路径(保留原始名称)
    file.filepath = `${dir}/${fileName}`;
}