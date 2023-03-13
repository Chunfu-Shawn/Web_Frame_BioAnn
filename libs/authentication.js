import {handler} from "../server.js";

export default async function authentication(ctx, isAdmin=false) {
    if(ctx.session) {
        if(isAdmin){
            if(ctx.session.username === "admin"){
                ctx.response.status = 200
                await handler(ctx.req, ctx.res)
            }else {
                ctx.response.status = 404
            }
        }else {
            ctx.response.status = 200
            await handler(ctx.req, ctx.res)
        }
    }else
        ctx.response.status = 404
}