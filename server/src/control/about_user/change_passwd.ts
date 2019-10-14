import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, success_info } from "../../utils/info"
import { update_one } from "../../dao/update";
import * as bcrypt from "bcrypt"
import { Users } from '../../model/User';
import { set_string_async } from "./../../utils/redis"
function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据

        let params = ["passwd"]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        //提前参数
        let {
            passwd
        } = ctx.state.private_params
        const user = ctx.state.private_params.username
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        passwd = bcrypt.hashSync(passwd, salt)
        update_one(Users, () => { }, () => { }, { user }, { passwd })
        const token = ctx.state.private_params.jwt
        //11h小时后失效
        await set_string_async(token, "logout", "EX", 11 * 60 * 60)
        return ctx.body = success_info
    }
}
module.exports = {
    method: "POST",
    function: control
}