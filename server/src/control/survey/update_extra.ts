import { survey_extra } from './../../interfaces/Survey';
import { check_state_object_has_property } from "./../../utils/check"
import { incomplete_param_info, delete_fail, success_info, error } from "../../utils/info"
import { survey_model } from "../../model/survey"
import { update_one } from "../../dao/update"
import { findone } from "../../dao/find"

function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        let params = ["survey_extra", "survey_id"]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        //提前参数
        const {
            survey_extra, survey_id

        } = ctx.state.private_params
        const create_user = ctx.state.private_params.username
        return await findone(survey_model, () => {
            ctx.body = error
        }, async () => {
            await update_one(survey_model,
                () => { ctx.body = success_info },
                () => { ctx.body = error }, { survey_id, create_user },
                { survey_extra })
        }, { "survey_extra.publish": true, survey_id })

    }
}
module.exports = {
    method: "POST",
    function: control
}