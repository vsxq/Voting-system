import { error } from './../../utils/info';
import { check_state_object_has_property } from "./../../utils/check"
import { incomplete_param_info, success_info } from "../../utils/info"
import { generate } from "shortid";
import { record_survey_model } from "../../model/record_survey"
import { insert_one } from "../../dao/insert"
import { findone } from "../../dao/find";
import { survey_model } from "../../model/survey";
import { record_survey_model_log } from "../../model/record_survey_log"
function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        let params = ["survey_data", "survey_id"]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        //提前参数
        const {
            survey_data,
            survey_id,
        } = ctx.state.private_params

        await findone(survey_model, async (data: any) => {
            const submit_id = generate()
            const ip = ctx.state.ip
            if (data.survey_extra.limit_ip) {
                //如果限制ip
                console.log("1111111111111")
                await findone(record_survey_model_log, () => {
                    //之前提交过
                    return ctx.body = error
                }, async () => {
                    //这个ip第一次提交
                    console.log(2222222222)
                    ctx.body = success_info
                    await insert_one({ ip, submit_id, survey_id }, record_survey_model_log)
                    //记录同步插入
                    //详细消息异步插入
                    survey_data.forEach((value: any) => {
                        insert_one({ ...value, survey_id }, record_survey_model)
                    });
                }, { ip, survey_id })

            }
            else {
                //如果不限制ip
                ctx.body = success_info
                await insert_one({ ip, submit_id, survey_id }, record_survey_model_log)
                //记录同步插入
                //详细消息异步插入
                survey_data.forEach((value: any) => {
                    insert_one({ ...value, survey_id }, record_survey_model)
                });

            }

        }, () => { }, { survey_id, })
        return
    }
}
module.exports = {
    method: "POST",
    function: control
}