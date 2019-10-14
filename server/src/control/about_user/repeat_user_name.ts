import { Users } from '../../model/User';
import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, registered_repeat_user_name, success_info } from "../../utils/info"
import { findone } from "../../dao/find"
function control() {
    return async function (ctx: any, next: Function) {
        //检查数据
        const registered_param = ["user"]
        if (!check_state_object_has_property(ctx, ...registered_param)) {
            return ctx.body = incomplete_param_info
        }
        const {
            user,

        } = ctx.state.private_params
        return await findone(Users,  () => {
            ctx.body = registered_repeat_user_name
        },() => {
            ctx.body = success_info
        }, {user})


    }

}
module.exports = {
    method: "GET",
    function: control
}