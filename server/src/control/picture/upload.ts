import { check_state_object_has_property } from "./../../utils/check"
import { incomplete_param_info,success_info } from "../../utils/info"
import * as Path from  'path'

 function control() {
    return async function (ctx: any, next: Function) {
        console.log("ssss",ctx.state.private_params)
        console.log(ctx.request.files)
        const file = Path.basename( ctx.request.files["file"].path);	// 获取上传文件
        console.log(file)
        

        return ctx.body = {...success_info,file}
                       
    }
}
module.exports = {
    method:"POST",
    function:control
}