import { survey_extra } from './../../interfaces/Survey';
import { generate } from "shortid";
import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, success_info } from "../../utils/info"
import { insert_one } from "../../dao/insert"
import { vote_model } from "../../model/vote"

function control() {
    return async function (ctx: any, next: Function) {

        // 检查数据
        let params = ["vote_name", "create_user","vote_img"]
        params = params.filter((value) => {
            return value !== ""
        })
        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        const generate_id = generate()
        const {
            vote_name,
            create_user,
            vote_img
        } = ctx.state.private_params
        await insert_one(
            {
                create_user,
                vote_name,
                vote_id:generate_id,
                player_container:[],
                vote_img:vote_img,

                
                //插入初始值
            }, vote_model
        )

        return ctx.body = { ...success_info, ...{ vote_id: generate_id } }
    }
}
module.exports = {
    method: "POST",
    function: control
}