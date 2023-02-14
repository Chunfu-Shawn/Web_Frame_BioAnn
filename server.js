import Koa from 'koa'
import nextjs from 'next'
import { parse } from 'url'
import bodyParser from 'koa-bodyparser'
// 导入koa router对象
import {Router} from './libs/koaRouters.js'
import {RouterAPI} from './libs/API-v1.0.0.js'
// session 有关模块
import {accessLogger} from "./libs/logSave.js"


// Determine whether it is a production environment
const dev = process.env.NODE_ENV !== 'production'
// initialize nextjs instance and expose request handler
const app = nextjs(
    {
        dev,
        dir: "./frontend",
    }
)

export const handler = app.getRequestHandler()

app.prepare().then(() => {
    // create an object to present web server
    const server = new Koa()

    // set session
    // server.keys = ['spatial-trans-web'];
    const CONFIG = {
        key: 'spatial-trans-web:sess',   //cookie key (default is koa:sess)
        maxAge: 24 * 60 * 60 * 1000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true,  //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,   //签名默认true
        rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false,  //(boolean) renew session when session is nearly expired,
        autoCommit:false,
    };
    //server.use(session(CONFIG, server));

    //设置koa日志访问记录
    //注意，需要放在nextjs路由前面，避免http请求被nextjs接受导致不能在后端进行记录
    server.use(accessLogger);
    // add post body parser
    server.use(bodyParser());

    // use Koa router
    server.use(Router.routes()).use(Router.allowedMethods())
    server.use(RouterAPI.routes()).use(RouterAPI.allowedMethods())

    // for NextJs router 在koa路由中未定义的，将交给nextjs路由继续处理
    server.use(async (ctx) => {
        try{
            const parsedUrl = parse(ctx.req.url, true)
            //const { pathname, query } = parsedUrl
            // 传入Node原生的req对象，和res对象，因为Nextjs框架需要兼容许多基于Node封装的web框架
            // 让nextjs全局处理其他页面的http访问
            await handler(ctx.req, ctx.res, parsedUrl)
            // 屏蔽koa中对response的内置处理，让nextjs来接手
            //ctx.response = false
        } catch (err) {
            console.error('Error occurred handling', ctx.req.url, err)
            ctx.res.statusCode = 500
            ctx.res.end('internal server error')
        }
    })

    server.listen(3000, () => {
        console.log('server is running at http://localhost:3000')
    })
})

