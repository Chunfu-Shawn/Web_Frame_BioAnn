// 导入router路由middleware
import router from 'koa-router'
import {getPassword} from "./usersAdminister/getPassword.js";
import {getUsers} from "./usersAdminister/getUsers.js";
import {handler} from "../server.js";
import {addAnUser} from "./usersAdminister/addAnUser.js";
import {changePassword} from "./usersAdminister/changePassword.js";
import {deleteAnUser} from "./usersAdminister/deleteAnUser.js";
import bcrypt from 'bcryptjs'


export const Router = router()
// 设置路由，与next.js的路由进行映射

// 账号登入的验证
Router.post('/login/validate', async (ctx) => {
    const {username, password} = ctx.request.body
    const user = await getPassword(username)
    // 比较传过来的hash加密的密码和数据库中盐加密的密码
    if(bcrypt.compareSync(password, user.password)){
        ctx.session.user = user.username
        console.log("Log in " + ctx.session.user)
        //ctx.session.isLogin = true
        // 服务端在内存中保存session信息（包括user）
        //await ctx.session.save();
        ctx.response.status = 200;
        ctx.response.body = {signal: 'Log in successful!', user: user.username};
    }else {
        ctx.response.body = null
        ctx.response.status = 401;
    }
})

// 账号登出
Router.get('/logout', (ctx, next) => {
    console.log("Log out " + ctx.session.user)
    // 删除session 退出登陆
    ctx.body = {signal: 'Log out, good bye!', user: ctx.session.user};
    ctx.session = null;
})

// 账号管理的页面, 判断是否是admin
Router.get('/manage', async (ctx) => {
    if(ctx.session.user === "admin") {
        ctx.response.status = 200
        await handler(ctx.req, ctx.res)
    }
    else
        ctx.response.status = 404
})

// 账号注册的页面, 判断是否是admin
Router.get('/register', async (ctx) => {
    if(ctx.session.user === "admin") {
        ctx.response.status = 200
        await handler(ctx.req, ctx.res)
    }
    else
        ctx.response.status = 404
})

// 账号注册的验证
Router.post('/register/validate', async (ctx) => {
    const {username, password} = ctx.request.body
    const users =  await getUsers()
    let userExists = false
    users.forEach( item => {
        if(item.username === username)
            userExists = true
    })
    if(ctx.session.user === "admin" && userExists){
        ctx.response.status = 401
        ctx.response.body = null
    }else {
        // 盐加密
        const salt = bcrypt.genSaltSync(10);
        const bcryptPassword = bcrypt.hashSync(password, salt);
        await addAnUser(username, bcryptPassword)
        ctx.response.status = 200
        ctx.response.body = { signal: 'Register successfully', user: username }
    }
})


// 更改账号密码
Router.post('/change_password', async (ctx) => {
    const {username, password} = ctx.request.body
    if(ctx.session.user === "admin"){
        // 盐加密
        const salt = bcrypt.genSaltSync(10);
        const bcryptPassword = bcrypt.hashSync(password, salt);
        await changePassword(username, bcryptPassword)
        ctx.response.status = 200
        ctx.response.body = { signal: 'Change password successfully', user: username }
    }else {
        ctx.response.status = 401
        ctx.response.body = null
    }
})

// 删除账号
Router.post('/delete_user', async (ctx) => {
    if(ctx.session.user === "admin" && ctx.request.body.username !== "admin"){
        await deleteAnUser(ctx.request.body.username)
        ctx.response.status = 200
        ctx.response.body = { signal: 'Delete successfully', user: ctx.request.body.username }
    }else {
        ctx.response.status = 401
        ctx.response.body = null
    }
})
