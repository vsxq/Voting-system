import { check_state_object_has_property } from "./../../utils/check"
import { incomplete_param_info ,get_picture_fail} from "../../utils/info"
import { readFile, exists, readFileSync, existsSync } from "fs"
import { join } from "path"
function control() {
    return async function (ctx: any, next: Function) {
        // 检查数据
        let params = ["picture_id"]
        if (!check_state_object_has_property(ctx, ...params)) {
            return ctx.body = incomplete_param_info
        }


        //提前参数
        const {
            picture_id

        } = ctx.state.private_params

        const path = __dirname + "/../../upload"
        const file = picture_id
        const file_router = join(path, file)
        if (existsSync(file_router)) {
            ctx.set({ 'Content-Type': 'image/jpeg' })
            return ctx.body=readFileSync(file_router)
        }
        else {
            return ctx.body = get_picture_fail
        }

    }
}
module.exports = {
    method: "GET",
    function: control
}