import * as router from "koa-router"
import { readdirSync } from "fs"
import { jwt_verity_async } from "../middleware/jwtVerify"
import { base_route_match } from "../utils/route_match"
import {params_async} from "../middleware/params"
import {log} from "../middleware/log"
const files = readdirSync(__dirname)


//蓝图
const Router = new router({
    prefix: '/api'
})
Router.use(log())
Router.use(params_async())
Router.use(jwt_verity_async())

//加载中间件





//多余页面
// Router.get("/test", async (ctx) => {
//     ctx.response.status = 401
//     ctx.body = "test"

// })
// Router.post("/test", async (ctx) => {
//     ctx.body = ctx.request.body
// })
const finally_router = base_route_match(files, Router)

export { finally_router as router }