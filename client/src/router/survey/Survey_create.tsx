import * as React from 'react';
import { useState } from "react"
//util
import { redirect,toast_error } from "../../utils/base_utils"
import { ajax_post, ajax_get } from "../../utils/ajax"//ajax方法
import { create_survey_url } from "../../utils/url" //重定向的url
import { url_redirect } from '../../utils/url_redirect'//重定向
import { status_enum } from "../../utils/enum" //状态{status,message}
//ui
import { Layout, Row, Col, Button, Modal } from 'antd';
import { Manage_head } from "../../componse/header"
const username = localStorage.getItem("username")


export const Survey_create = () => {
    const check = async () => {
        const survey_name: string = project_name
        if (survey_name === "") {
            toast_error("输入不能为空")
        }
        else {
            //"survey_name", "create_user"

            const create_user: string = username
            const data = await ajax_post(create_survey_url, { survey_name, create_user })
            if (data.status === status_enum.success_info) {
                redirect(`${url_redirect.survey_update}/${data.survey_id}`)
            }
            else {
                console.log(data)
            }

        }

    }



    const [project_name, setProject_name] = useState("")

    const {
        Footer, Content,
    } = Layout;
    return (
        <Layout>
            <Manage_head page_name={"survey_create"} ></Manage_head>
            
                <h1 className="create_h1">问卷调查</h1>
                <Row type="flex" justify="center" align="middle">
                    <Col >
                        <label className="create_label">问卷名称</label>
                        <input type="text" className="ant-input create_input" value={project_name} onChange={(e) => {
                            setProject_name(e.target.value)
                        }} />
                        <Button type="primary" className="create_button" onClick={check}>立即创建</Button>
                    </Col>
                </Row>
           
            <Footer style={{ textAlign: 'center' }}>
                大同科技 ©2019 Created by vsxq</Footer>
        </Layout>

    )
}
