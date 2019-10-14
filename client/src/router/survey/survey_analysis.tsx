import * as React from 'react';
import { status_enum } from "../../utils/enum" //状态{status,message}
import { ajax_post, ajax_get } from "../../utils/ajax"//ajax方法
import echarts from 'echarts'
import { Head } from "../../componse/survey_analysis/head"
import { Manage_head } from "../../componse/header"
import { Survey_analysis_app } from "../../componse/survey_analysis_app"
import { url_api } from "../../utils/url"
import { Layout, Row, Col, Button, Modal, message } from 'antd';
import { redirect, toast_error, goto_login, add_id } from "../../utils/base_utils"
import { useState, useEffect, createContext } from "react"

export const Question_context = createContext(null)
export function Survey_analysis({ ...props }) {
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
    const [global_render, setGlobal_render] = useState({ survey_name: "", render_data: [] })
    const [has_auth, setHas_auth] = useState(false)


    useEffect(() => {
        const authority = async () => {
            const data = await ajax_post(url_api.survey_analysis, { survey_id })
            if (Number(data.status) === status_enum.success_info) {

                if (data.data.answer_deal.length === 0) {
                    console.log(data)
                    message.warning("还没有收集到任何数据")
                    message.warning("快快去收集")

                    setTimeout(() => {
                        window.history.go(-1)
                    }, 2000);
                }
                else {

                    //初始化全局数据

                    const { survey_name, question_container } = data.data.survey
                    const { answer_deal } = data.data
                    const render_data = question_container.map((q_value) => {
                        const analysis_answers = answer_deal.find((a_value) => {
                            if (a_value.question_id === q_value.id)
                                return true
                        }).answers
                        return { ...q_value, analysis_answers }

                    })
                    const d = { render_data, survey_name }
                    setGlobal_render(d)
                    console.log(d)

                    setHas_auth(true)
                }
            }
            else {
                message.error("请不要随意修改url")
                message.error("白屏警告")
            }

        }

        authority()

    }, [])


    return (<>

        {has_auth ? (<>
            <Manage_head page_name="数据分析"></Manage_head>
            <Content style={{ background: '#ECECEC', padding: '30px' }}>
                <Row>
                    <Col span={12} offset={6} >
                        <div className="analysis_card">
                            <Head survey_name={global_render.survey_name}></Head>
                            <div>
                                {global_render.render_data.map((value, index) => (
                                    <Question_context.Provider  value={{ ...value, index }} key={value.id}>
                                        <div className="analysis_card_item">

                                        <Survey_analysis_app  question_type={value.question_type}  
                                        ></Survey_analysis_app>
                                        </div>
                                       
                                    </Question_context.Provider>))}
                            </div>


                        </div>
                    </Col>
                </Row>
            </Content>


        </>) : (<></>)}
    </>)
}
