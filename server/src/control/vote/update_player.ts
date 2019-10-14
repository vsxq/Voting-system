
import { check_state_object_has_property, check_object_has_property } from "../../utils/check"
import { vote_model } from "../../model/vote"
import { update_one } from "../../dao/update"
import { incomplete_param_info, success_info, error } from "../../utils/info"

function control() {
    return async function (ctx: any, next: Function) {

        const params = ["vote_id", "player_container"]

        //检查所有数据
        if (!check_state_object_has_property(ctx, ...params)) {
            console.log(ctx.state.private_params)
            return ctx.body = incomplete_param_info
        }

        const {
            vote_id,


            player_container,



        } = ctx.state.private_params


        return await update_one(vote_model, () => {
            ctx.body = success_info
        }, () => {
            ctx.body = error
        }, { vote_id, create_user: ctx.state.private_params.username }, {


                player_container,

            })
    }
}
module.exports = {
    method: "POST",
    function: control
}