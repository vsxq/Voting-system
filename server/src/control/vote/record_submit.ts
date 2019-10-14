import { error } from './../../utils/info';
import { check_state_object_has_property } from "./../../utils/check"
import { incomplete_param_info, success_info, cant_find_survey } from "../../utils/info"
import { generate } from "shortid";
import { get_string_async, set_string_async, incr_string_async } from "../../utils/redis"
import { insert_one } from "../../dao/insert"
import { update_one } from "../../dao/update";
import { vote_model } from "../../model/vote";
import { record_vote_model_log } from '../../model/record_vote_log';

function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        let params = ["player_id", "vote_id"]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        //提前参数
        const {
            player_id,
            vote_id,
        } = ctx.state.private_params
        //先在redis里检查今天是否投过，同一个ip，同一个vote最多运行投三次。
        const create_user = ctx.state.private_params.username
        const ip = ctx.state.ip

        const vote_id_join_username = `${vote_id}#${create_user}`
        const vote_id_join_ip = `${vote_id}@${ip}`
        const vote_result_in_redis = `${vote_id}^14513`

        const find_v_result = await get_string_async(vote_result_in_redis)
        if (find_v_result === null) {
            //如果找不到，直接报错，非法访问

            return ctx.body = cant_find_survey
        }

        const find_v_u_result = await get_string_async(vote_id_join_username)
        const find_v_i_result = await get_string_async(vote_id_join_ip)

        let u_status = false
        let i_status = true
        if (Number(find_v_u_result) <=3 ) {
            u_status = true
        }
        if (find_v_i_result !== null) {
            if (Number(find_v_i_result) <= 3) {
                i_status = true
            }
        }
        else {
            i_status = true
        }
        if (u_status && i_status) {
            //写入redis
            await incr_string_async(vote_id_join_username)
            await incr_string_async(vote_id_join_ip)
            //写入数据库
            await incr_string_async(`${vote_id}=_${player_id}`)
          
            insert_one({ ip, vote_id, player_id }, record_vote_model_log)

            return ctx.body = success_info

        }
        else {
            ctx.body = error
            console.log(find_v_u_result)
            console.log(find_v_i_result)
        }

        return
    }
}
module.exports = {
    method: "POST",
    function: control
}