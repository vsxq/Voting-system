import { Layout, Row, Col, message } from 'antd';
import { goto_login } from "../../utils/base_utils"
import { useState, useEffect, useRef, useReducer } from "react"
import { reducer, initValue, Context } from ".././../redux/survey_preview_show_render"
import * as React from 'react';
import { survey_record_show } from "../../utils/url" //重定向的url
import { ajax_get } from "../../utils/ajax"//ajax方法
import { status_enum } from "../../utils/enum" //状态{status,message}
import { Render_lists } from "../../componse/survey_show_app"
import { Render_head } from "../../componse/survey_show/render_head"
import { Submit_data_record } from "../../componse/survey_show_app"
export const Survey_record = ({ ...props }) => {
    const {
        Footer, Content,
    } = Layout;
    const survey_id = props.match.params.id

    //检查该用户是否有对id修改的权限
    const [has_auth, setHas_auth] = useState(false)
    const [state, dispatch] = useReducer(reducer, initValue)
    useEffect(() => {
        const authority = async () => {
            const data = await ajax_get(survey_record_show, { survey_id })
            if (Number(data.status) === status_enum.success_info) {
                setHas_auth(true)
                const { survey_id, question_container, survey_name } = data.data
                dispatch({ type: "INITIAL", payload: { survey_id, question_container, survey_name } })

            }
            else if (Number(data.status) === status_enum.illegal_survey) {
                setHas_auth(false)
                message.error("问卷不存在，或者还没有发布")
                message.error("2s后将返回上一网页")
                setTimeout(() => {
                    window.history.go(-1)
                }, 2000);
            }
            else {
                message.error("服务器异常")
            }

        }

        authority()

    }, [])
    return (
        <>
            {has_auth ? (

                <div style={{ backgroundImage: "url(http://pic2bj.shejibao.com/img/2016/09/05/ffc741571b0d45a74ba7df78c34d2ca2.png@!width_200)" }}>  <Context.Provider value={{ state, dispatch }}>


                    <Layout >
                        <Row>
                            <Col span={12} offset={6} >
                                <div className="show_survey_card">

                                    <Render_head></Render_head>
                                    <Render_lists></Render_lists>
                                    <Submit_data_record className={"render_preview"}></Submit_data_record>
                                </div>

                            </Col>

                        </Row>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        大同科技 ©2019 Created by vsxq</Footer>
                </Context.Provider>


                </div>
            ) : (<>
            </>)}
        </>

    )
}
