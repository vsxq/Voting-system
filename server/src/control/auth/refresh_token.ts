import { check_state_object_has_property } from "./../../utils/check"
import { success_info, clock_problem } from "./../../utils/info"
import * as jwt from "jsonwebtoken"
import { jwt_secret } from "../../../config"
import { set_string_async } from "./../../utils/redis"
import {refresh_time} from "./../../../config"
function control() {
    return async function (ctx: any, next: Function) {
        const current_date = Math.floor(Date.now() / 1000)
        const jwt_sign_date= ctx.state.private_params.jwt_start 
        //refresh 
        if ((current_date-jwt_sign_date)>refresh_time) {
            const old_token = ctx.state.private_params.jwt
            const new_token = await jwt.sign({
                user: ctx.state.private_params.username
            }, jwt_secret, {
                    expiresIn: "10h"
                })
            await set_string_async(old_token, "before_refresh_token", "EX", 11 * 60 * 60)//11小时过期
            return ctx.body = { ...success_info, token: new_token, date: Date.now() }
        }
        else {
            return ctx.body = clock_problem
        }



    }
}
module.exports = {
    method: "POST",
    function: control
}