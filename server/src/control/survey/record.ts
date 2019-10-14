import { answer } from './../../interfaces/Survey';
import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, illegal_vote, success_info, illegal_survey } from "../../utils/info"
import { findone } from "../../dao/find"
import { survey_model } from "../../model/survey"
import { get_string_async, set_string_async, incr_string_async } from "../../utils/redis"

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

        } = ctx.state.private_params
        const redis_survey = await get_string_async(`${survey_id}%^`)
        if (redis_survey !== null) {
            return ctx.body = JSON.parse(redis_survey)
        }
        return findone(survey_model, async (data: any) => {
            if (redis_survey === null) {
                await set_string_async(`${survey_id}%^`,JSON.stringify( { ...success_info, data }))
            }


            ctx.body = { ...success_info, data }
        },
            () => { ctx.body = illegal_survey },
            { survey_id, "survey_extra.publish": true },
            { create_user: 0 })

    }
}
module.exports = {
    method: "GET",
    function: control
}