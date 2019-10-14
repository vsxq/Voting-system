import { Users } from '../../model/User';
import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, registered_repeat_user_name, success_info } from "../../utils/info"
import {findall, findone} from "../../dao/find"
import { insert_one } from "../../dao/insert"
import * as bcrypt from "bcrypt"
function control() {
    return async function (ctx: any, next: Function) {

        // 检查数据
        const params = ["user", "passwd","level"]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        let {
            user,
            passwd,
            level
        } = ctx.state.private_params
        ctx.state.name = user

        //数据库操作
        return await findone(Users, () => { ctx.body = registered_repeat_user_name }, async () => {
            const saltRounds = 10;

            const salt = bcrypt.genSaltSync(saltRounds);
            passwd = bcrypt.hashSync(passwd,salt)
            await insert_one({
                user,
                passwd,
                level,
                sex:false, //男
                
            }, Users)
            ctx.body = success_info
        }, { user })





    }

}
module.exports = {
    method: "POST",
    function: control
}
