import { check_state_object_has_property } from "../../utils/check"
import { success_info,cant_find_survey } from "../../utils/info"
import { findall } from "../../dao/find";
import { vote_model } from "../../model/vote"


function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        const create_user = ctx.state.private_params.username
       return  await findall(vote_model, (data: any) => {
            ctx.body = {data,length:data.length,...success_info}
        }, () => {
            ctx.body = cant_find_survey
        }, { create_user },
            {
                "vote_name": 1,
                "_id": 0, "vote_id": 1,
            })

    }
}
module.exports = {
    method: "POST",
    function: control
}