
import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, illegal_survey,authority_check_fail ,success_info} from "../../utils/info"
import { survey_model } from "../../model/survey"
import { findone } from "../../dao/find"

function control() {

    return async function (ctx: any, next: Function) {
        // 检查数据

        let params = ["survey_id"]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        //提前参数
        const {
            survey_id,
            username
        } = ctx.state.private_params
        return await findone(survey_model, (data: any) => {
            ctx.body = {...success_info,data}
        }, () => { ctx.body = authority_check_fail }, {
                survey_id,create_user: ctx.state.private_params.username 
            }, { _id: 0, "__v": 0 })
    }
}
module.exports = {
    method: "POST",
    function: control
}