import fs from "fs"
// 导入router路由middleware

export function getHumanMap() {
    return fs.readFileSync('frontend/public/images/human-color.svg', 'utf8')
}