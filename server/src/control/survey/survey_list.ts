import { check_state_object_has_property } from "../../utils/check"
import { success_info,cant_find_survey } from "../../utils/info"
import { findall } from "../../dao/find";
import { survey_model } from "../../model/survey"


function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        const create_user = ctx.state.private_params.username
       return  await findall(survey_model, (data:any) => {
            
            ctx.body = {data,length:data.length,...success_info}
        }, () => {
            ctx.body = cant_find_survey
        }, { create_user },
            {
                "survey_name": 1,
                "_id": 0, "survey_id": 1,"survey_extra":1
            })

    }
}
module.exports = {
    method: "POST",
    function: control
}