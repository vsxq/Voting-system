import { check_state_object_has_property } from "./../../utils/check"
import { incomplete_param_info, success_info } from "../../utils/info"
import { survey_model } from "../../model/survey"
import { delete_one } from "../../dao/delete"

function control() {
    return async function (ctx: any, next: Function) {


        let params = ["survey_id",]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        const {
            survey_id,
        } = ctx.state.private_params
        const create_user = ctx.state.private_params.username
        return ctx.body = await delete_one(survey_model, { survey_id,create_user })
        

    }
}
module.exports = {
    method: "POST",
    function: control
}