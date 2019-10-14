

import {  base_info } from './info';
import {status_enum} from "../../../common_enum"



export interface base_info {
    message: string,
    status: status_enum
    [propName: string]: any

}


export const success_info:base_info={
message:"成功,一切正常",
    status:status_enum.success_info
}


export const error:base_info={
message:"错误,用户非法操作,即将重新登录",
    status:status_enum.error
}


export const incomplete_param_info:base_info={
message:"参数丢失,请检查参数",
    status:status_enum.incomplete_param_info
}


export const login_invalid_user:base_info={
message:"登录--用户名错误",
    status:status_enum.login_invalid_user
}


export const login_invalid_passwd:base_info={
message:"登录--密码错误",
    status:status_enum.login_invalid_passwd
}


export const illegal_vote:base_info={
message:"非法的vote_id 或者提交的vote格式错误,该请求不是由浏览器常规发起,你的ip已经被记录",
    status:status_enum.illegal_vote
}


export const illegal_survey:base_info={
message:"非法的survey_id 或者提交的survey格式错误,该请求不是由浏览器发起,你的ip已经被记录下来",
    status:status_enum.illegal_survey
}


export const invalid_method:base_info={
message:"非法的登录方式,本系统暂时只支持post与get请求",
    status:status_enum.invalid_method
}


export const registered_repeat_user_name:base_info={
message:"重复的用户名,请尝试更换另一个用户名 ",
    status:status_enum.registered_repeat_user_name
}


export const token_drop:base_info={
message:"本次请求没有携带token(jwt),该请求不是由浏览器常规发起,你的ip已经被记录",
    status:status_enum.token_drop
}


export const error_token:base_info={
message:"token过期或者token不是由本应用签发,请重新登录获取新的token",
    status:status_enum.error_token
}


export const illegal_token:base_info={
message:"该token已失效,原因可能是用户主动登出或修改密码或者之前的被refresh_token替代的token,请重新登录获取新的token",
    status:status_enum.illegal_token
}


export const clock_problem:base_info={
message:"额,你家电脑时钟系统有问题,",
    status:status_enum.clock_problem
}


export const create_new_survey_success:base_info={
message:"创建新的survey成功",
    status:status_enum.create_new_survey_success
}


export const cant_find_survey_id:base_info={
message:"找不到要更新或者删除的survey的id,请避免重复操作",
    status:status_enum.cant_find_survey_id
}


export const delete_success:base_info={
message:"删除成功",
    status:status_enum.delete_success
}


export const delete_fail:base_info={
message:"请不要对本系统恶意攻击,你的ip已被记录,请等待喝茶邀请",
    status:status_enum.delete_fail
}


export const authority_check_fail:base_info={
message:"不用瞎搞事情,不是你的就不是你的",
    status:status_enum.authority_check_fail
}


export const get_picture_fail:base_info={
message:"读取图片失败，请检查参数",
    status:status_enum.get_picture_fail
}


export const cant_find_survey:base_info={
message:"当前用户没有存在的问卷调查",
    status:status_enum.cant_find_survey
}
