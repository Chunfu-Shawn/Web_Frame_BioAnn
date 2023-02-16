// 导入router路由middleware
import router from 'koa-router'
import {getUsers} from "./usersAdminister/getUsers.js";


export const RouterAPI = router()

RouterAPI.get('/api/user/', async (ctx) => {
    const { user } = ctx.session;
    // 如果没有log in，session里面不存在user
    if(user === undefined)
        ctx.body = { username: null }
    else ctx.body = { username: user }
})


RouterAPI.get('/api/users/', async (ctx) => {
    const { user } = ctx.session;
    if(user === "admin") {
        ctx.body = await getUsers()
    }
    else ctx.body = null
})




