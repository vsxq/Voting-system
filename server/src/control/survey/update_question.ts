
import { check_state_object_has_property, check_object_has_property } from "../../utils/check"
import { survey_model } from "../../model/survey"
import { update_one } from "../../dao/update"
import { incomplete_param_info, success_info, cant_find_survey_id, error } from "../../utils/info"
import { findone } from '../../dao/find';
function control() {
    return async function (ctx: any, next: Function) {

        const params = ["survey_id", "question_container"]

        //检查所有数据
        if (!check_state_object_has_property(ctx, ...params)) {
            console.log(ctx.state.private_params)
            return ctx.body = incomplete_param_info
        }

        const {
            survey_id,


            question_container,



        } = ctx.state.private_params
        await findone(survey_model, async (data: any) => {
            if (data.survey_extra.publish === true) {
                return ctx.body = error
            }
            
        }, () => { return ctx.body = cant_find_survey_id }, { survey_id })

        return await update_one(survey_model, () => {
            ctx.body = success_info
        }, () => {
            ctx.body = cant_find_survey_id
        }, { survey_id, create_user: ctx.state.private_params.username }, {


                question_container,

            })
    }
}
module.exports = {
    method: "POST",
    function: control
}