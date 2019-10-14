
import { check_state_object_has_property } from "./../../utils/check"
import { set_string_async} from "./../../utils/redis"
import { success_info } from "../..//utils/info";


 function control() {
    return async function (ctx: any, next: Function) {
         const token = ctx.state.private_params.jwt
            //11h小时后失效
            await set_string_async(token,"logout","EX",11*60*60)
            return ctx.body=success_info              
    }
}
module.exports = {
    method:"POST",
    function:control
}