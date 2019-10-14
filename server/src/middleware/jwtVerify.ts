import * as jwt from "jsonwebtoken"
import {
    jwt_secret
} from "../../config"
import { check_state_object_has_property } from "../utils/check"
import { get_string_async } from "../utils/redis"
import { illegal_token, error_token, token_drop } from "../utils/info"


export function jwt_verity_async() {
    return async function (ctx: any, next: Function) {
        /**
         * 例外情况 注册 重复用户名
         * 参加投票
         * 图片相关
         * 登录
         */
        const exclusive_route = ["/about_user/registered", "/about_user/repeat_user_name", "/survey/record", "/picture", "/auth/get_token"]
        if (exclusive_route.some((section_route) => { return ctx.request.path.includes(section_route) })
        ) //特例
        {
            await next()
        } else {

            if (check_state_object_has_property(ctx, "jwt")) {
                const token = ctx.state.private_params.jwt




                await jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
                    console.log(err)
                    if (err || !decoded) {

                        return ctx.body = error_token
                    }
                    else {
                        console.log(decoded)
                        const jwt_status = await get_string_async(token)
                        //用这个name去验证,而不是用户提交的数据,避免恶意攻击
                        ctx.state.private_params.username = decoded.user
                        ctx.state.private_params.jwt_start = decoded.iap
                        ctx.state.private_params.jwt_end = decoded.exp
                        if (jwt_status === null) {
                            await next()
                        }
                        else {
                            illegal_token.reason = jwt_status
                            return ctx.body = illegal_token
                        }
                        
                    }
                }
                )
            }



            else {
                return ctx.body = token_drop
            }
        }



    }
}