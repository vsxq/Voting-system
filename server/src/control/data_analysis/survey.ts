import { answer } from './../../interfaces/Survey';
import { check_state_object_has_property, check_object_has_property } from "../../utils/check"
import { incomplete_param_info } from "../../utils/info"
import { findone } from "../../dao/find";
import { survey_model } from "../../model/survey"
import { delete_fail, success_info, error } from "../../utils/info"
import { get_data } from "../../dao/survey_analysisi_dao"


function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        let params = ["survey_id",]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        //提前参数
        const {
            survey_id

        } = ctx.state.private_params
        const create_user = ctx.state.private_params.username
        return await findone(survey_model, async (data: any) => {
            
            
            await get_data(survey_id,
                async (answers: any) => {

                    const answer_deal = answers.map((value: any) => {
                        
                        const answers = value.result.reduce((prev: any, next: any) => {
                            prev[next] = (prev[next] + 1) || 1
                            return prev
                        }, {})
                        return { question_id: value._id, answers }
                    })



                    ctx.body = await { data: { survey: data, answer_deal }, ...success_info }
                }
                , )



        }, () => { return ctx.body = error }, { survey_id, create_user }, { question_container: 1, survey_name: 1,  })


    }
}
module.exports = {
    method: "POST",
    function: control
}