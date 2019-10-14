import { check_state_object_has_property } from "../../utils/check"
import { incomplete_param_info, success_info, error, illegal_survey } from "../../utils/info"
import { findone } from "../../dao/find"
import { survey_model } from "../../model/survey"

 function control() {
    return async function (ctx: any, next: Function) {
                    // 检查数据
                     let params = ["survey_id"]
                     
                     if (!check_state_object_has_property(ctx, ...params)) {
                         return ctx.body = incomplete_param_info
                     }
                    //提前参数
                     const {
                         survey_id,
                       
                         
                     } = ctx.state.private_params 
                     await findone(survey_model,(data:any)=>{
                         ctx.body={...success_info,data}
                     },()=>{
                         ctx.body=illegal_survey//找不到,就是非法的survey id了
                     },{survey_id,create_user:ctx.state.private_params.username })      
    }
}
module.exports = {
    method:"POST",
    function:control
}