
import { player } from './../../interfaces/Vote';

import { vote_model } from '../../model/vote';
import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, success_info, error, illegal_survey } from "../../utils/info"
import { findone } from "../../dao/find"
import { get_string_async, set_string_async, incr_string_async } from "../../utils/redis"
import { record_vote_status } from "../../model/vote_status"
import { record_vote_model_log } from "../../model/record_vote_log"
import { update_one } from '../../dao/update';
import { insert_one } from '../../dao/insert';

function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        //和update_before的区别是 不会对create_user检查，默认所有的人气投票都是已发布的，和问卷不一样，投票相对安全些低一些，追求数据量。
        //同步返回数据，异步记录，增加访问量。
        let params = ["vote_id"]

        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }
        //提前参数
        const {
            vote_id,


        } = ctx.state.private_params
        await findone(vote_model, async (data: any) => {
            //在redis里获取数据
            const { player_container } = data
            const player_container_id_array = player_container.map((value: any) => {
                return value.player_id
            })
            const data1 = data.player_container.map((value: any) => {
                return {
                    player_id: value.player_id, player_name: value.player_name, player_img: [{ url: value.player_img[0].url }]
                }
            })
            data.player_container = data1
            data.vote_img = [{ url: data.vote_img[0].url }]
            const vote_result_in_redis = `${vote_id}^14513`
            const vote_page_view = `${vote_id}~page_view`
            const return_array: any = []

            if (await get_string_async(vote_result_in_redis) === null) {
                //全新的投票，一切从头开始，复杂无比
                await set_string_async(vote_result_in_redis, "balala")
                await findone(record_vote_status, async (mongoodb_data: any) => {
                    console.log(1)
                    const da1 = await record_vote_model_log.countDocuments({}).exec()


                    const page_view = mongoodb_data.get("page_view") + 1


                    player_container_id_array.map(async (value: any) => {
                        const da1 = await record_vote_model_log.countDocuments({ vote_id, player_id: value }).exec()

                        await set_string_async(`${vote_id}=_${value}`, Number(da1) + 1)
                        return_array.push({ value: da1 + 1 })

                    })
                    await set_string_async(vote_page_view, Number(page_view))
                    update_one(record_vote_status, () => { }, () => { }, { vote_id }, { page_view })
                    return ctx.body = { ...success_info, data, vote_count: return_array, page_view }

                }, async () => {
                    console.log(2)
                    await incr_string_async(vote_page_view)
                    player_container_id_array.map(async (value: any) => {
                        return_array.push({ [value]: 1 })
                        await incr_string_async(`${vote_id}=_${value}`)

                    })
                    insert_one({
                        vote_id
                        , page_view: 1
                    }, record_vote_status)
                    return ctx.body = {
                        ...success_info, data,
                        vote_count: return_array,
                        page_view: 1
                    }
                }, { vote_id })


            }
            else {
                //读取数据就好啦


                player_container_id_array.map(async (value: any) => {
                    const redis_value = await get_string_async(`${vote_id}=_${value}`)
                    await return_array.push({ [value]: redis_value })

                })
                console.log(3)
                const page_view = await incr_string_async(vote_page_view)
                //异步插入
                update_one(record_vote_status, () => { }, () => { }, { vote_id }, { page_view })


                return ctx.body = {
                    ...success_info, data,
                    vote_count: return_array,
                    page_view
                }

            }


        }, () => {
            ctx.body = illegal_survey//找不到,就是非法的survey id了
        }, { vote_id, }, { create_user: 0 })
    }
}
module.exports = {
    method: "POST",
    function: control
}