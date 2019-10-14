import { survey_extra } from './../../interfaces/Survey';
import { generate } from "shortid";
import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, success_info } from "../../utils/info"
import { insert_one } from "../../dao/insert"
import { survey_model } from "../../model/survey"

function control() {
    return async function (ctx: any, next: Function) {

        // 检查数据
        let params = ["survey_name", "create_user"]
        params = params.filter((value) => {
            return value !== ""
        })
        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        const survey_id = generate()
        const {
            survey_name,
            create_user,
        } = ctx.state.private_params
        await insert_one(
            {
                create_user,
                survey_name,
                survey_id,
                question_container:[],
                survey_extra:{
                    publish:false,
                    survey_note:"",
                }
                //插入初始值
            }, survey_model
        )

        return ctx.body = { ...success_info, ...{ survey_id } }
    }
}
module.exports = {
    method: "POST",
    function: control
}