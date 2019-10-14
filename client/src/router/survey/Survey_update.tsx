import * as React from 'react';
import { useState, useEffect, useRef, useReducer } from "react"
//redux
import { reducer, initValue, Context } from "../../redux/survey_update_redux"
//componse
import { Add_select_new_problem_type, Add_edit_row } from "../../componse/survey_add_app"
import { Render_lists } from "../../componse/survey_update_list_render_app"
import { Edit_edit_row, Edit_select_new_problem_type } from "../../componse/survey_update_app"

//util
import { redirect, toast_error, goto_login, add_id } from "../../utils/base_utils"
import { ajax_post, ajax_get } from "../../utils/ajax"//ajax方法
import { survey_authority_check_url } from "../../utils/url" //重定向的url
import { url_redirect } from '../../utils/url_redirect'//重定向
import { status_enum } from "../../utils/enum" //状态{status,message}

//ui
import { Layout, Row, Col, Button, Modal, message } from 'antd';
import { Survey_update_head } from "../../componse/header"


export const Survey_update = ({ ...props }) => {
    const {
        Footer, Content,
    } = Layout;
    const survey_id = props.match.params.id
    //首先进行本地是否有
    const username = localStorage.getItem("username")
    if (username === undefined || username === null) {
        goto_login()
        return <></>
    }
    //检查该用户是否有对id修改的权限
    const [has_auth, setHas_auth] = useState(false)
    const [state, dispatch] = useReducer(reducer, initValue)
    useEffect(() => {
        const authority = async () => {
            const data = await ajax_post(survey_authority_check_url, { survey_id })
            if (Number(data.status) === status_enum.success_info) {
                if (data.data.survey_extra.publish === true) {

                    message.error("问卷已发布，不允许编辑")
                    message.error("2s后将返回上一网页")
                    setTimeout(() => {
                        window.history.go(-1)
                    }, 2000); 
                    setHas_auth(false)
                }
                else {
                    setHas_auth(true)
                    const { survey_id, question_container, survey_name } = data.data
                    dispatch({ type: "INITIAL", payload: { survey_id, question_container, survey_name } })
                    question_container.map((value) => {
                        add_id(value.id)
                    })
                }
            }
            else { setHas_auth(false) }

        }

        authority()

    }, [])

    return (
        <>
            {has_auth ? (

                <>  <Context.Provider value={{ state, dispatch }}>
                    <Survey_update_head page_name={"survey_update"} name={state.data.survey_name} ></Survey_update_head>

                    <Layout>
                        <Row>
                            <Col span={12}>
                                {state.editing_status ? (<>
                                    <Edit_select_new_problem_type></Edit_select_new_problem_type>
                                    <div className={"edit_area"}>
                                        <Edit_edit_row ></Edit_edit_row>
                                    </div>
                                </>) : (<>
                                    <Add_select_new_problem_type></Add_select_new_problem_type>
                                    <div className={"edit_area"}>
                                        <Add_edit_row ></Add_edit_row>
                                    </div></>)}

                            </Col>
                            <Col span={12}> <Render_lists></Render_lists></Col>
                        </Row>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        大同科技 ©2019 Created by vsxq</Footer>
                </Context.Provider>


                </>
            ) : (<>
            </>)}
        </>

    )
}
