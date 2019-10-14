
export const url_api={
    login_url:"/api/auth/get_token",
    logout_url:"/api/auth/logout",
    refresh_token:"/api/auth/refresh_token",
    registered_url:"/api/about_user/registered",
    repeat_user_name_url:"/api/about_user/repeat_user_name",
    show_survey_url:"/api/vote/show",
    create_survey_url:"/api/survey/create",
    survey_authority_check_url:"/api/survey/update_before",
    survey_preview_url:"/api/survey/preview",
    survey_list:"/api/survey/survey_list",
    survey_delete:"/api/survey/delete",
    survey_extra_url:"/api/survey/update_extra",
    survey_record_show:"/api/survey/record",
    survey_record_submit:"/api/survey/record_submit",
    survey_analysis:"/api/data_analysis/survey",
    vote_create:"/api/vote/create",
    vote_before_update:"/api/vote/update_before",
    vote_list:"/api/vote/vote_list",
    vote_delete:"/api/vote/delete",
    vote_record:"/api/vote/record",
    vote_record_submit:"/api/vote/record_submit"
}

export const {login_url,registered_url,repeat_user_name_url,show_survey_url,create_survey_url,survey_authority_check_url,survey_preview_url,survey_list,survey_delete, survey_extra_url,survey_record_show,survey_record_submit}=url_api
