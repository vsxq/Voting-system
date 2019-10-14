export enum status_enum {
    success_info,//成功,一切正常
    error,//错误,用户非法操作,即将重新登录
    incomplete_param_info,//参数丢失,请检查参数
    login_invalid_user,//登录--用户名错误
    login_invalid_passwd,//登录--密码错误
    illegal_vote,//非法的vote_id 或者提交的vote格式错误,该请求不是由浏览器常规发起,你的ip已经被记录
    illegal_survey,//非法的survey_id 或者提交的survey格式错误,该请求不是由浏览器发起,你的ip已经被记录下来
    invalid_method,//非法的登录方式,本系统暂时只支持post与get请求
    registered_repeat_user_name,//重复的用户名,请尝试更换另一个用户名
    token_drop,//本次请求没有携带token(jwt),该请求不是由浏览器常规发起,你的ip已经被记录
    error_token,//token过期或者token不是由本应用签发,请重新登录获取新的token
    illegal_token,//该token已失效,原因可能是用户主动登出或修改密码或者之前的被refresh_token替代的token,请重新登录获取新的token
    clock_problem,//额,你家电脑时钟系统有问题,
    create_new_survey_success,//创建新的survey成功
    cant_find_survey_id,//找不到要更新或者删除的survey的id,请避免重复操作
    delete_success,//删除成功
    delete_fail,//请不要对本系统恶意攻击,你的ip已被记录,请等待喝茶邀请
    authority_check_fail,//不用瞎搞事情,不是你的就不是你的
    get_picture_fail,//读取图片失败，请检查参数
    cant_find_survey,//当前用户没有存在的问卷调查
}

export enum type_quesition {
    //TODO 以后添加
    radio,
    text,
    checkbox,
    rate
    
}
export enum type_question_declare {
    "单选",
    "说明"
}
export const type_question_object = {
    radio: "单选",
    text: "文本",
    checkbox:"多选",
    rate:"评分"
    

}
export const vip_type={
    normal:"普通",
    profession:"专业",
    
}
export enum input_check_enum{
    null,tel,email,int,float
}
export const input_check={
    null:'没有验证',
    tel:"手机号验证",
    email:"邮箱验证",
    int:"整数验证",
    float:"浮点数验证",
}
let char_num:any={}
for(let i=0;i<100;i++){
    char_num[i]=String.fromCharCode(i+65)
}
export const char_num_object=char_num

