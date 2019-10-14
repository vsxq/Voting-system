import * as React from 'react';
import { useState } from "react"
//util
import { redirect, toast_error } from "../../utils/base_utils"
import { ajax_post } from "../../utils/ajax"//ajax方法
import { url_api } from "../../utils/url" //重定向的url
import { url_redirect } from '../../utils/url_redirect'//重定向
import { status_enum } from "../../utils/enum" //状态{status,message}
//ui
import { Layout, Row, Col, Button, Modal, Tooltip, Icon, Upload, message } from 'antd';
import { beforeUpload } from "../../utils/picture"
import { Manage_head } from "../../componse/header"


export const Vote_create = () => {
    const username = localStorage.getItem("username")
    const [model_show, setModel_show] = useState(false)
    const [fileList, setFile_picture] = useState([])

    const onChange = (info) => {
        let fileList1 = [...info.fileList];
        fileList1 = fileList1.slice(-1);
        fileList1 = fileList1.map(file => {
            if (file.response) {

                file.url = `/api/picture/show?picture_id=${file.response.file}`;
            }
            return file;
        });

        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }


        setFile_picture(fileList1)



    }
    const check = async () => {
        const vote_name: string = project_name
        if (vote_name === "") {
            toast_error("输入不能为空")
        }
        else {


            const create_user: string = username
            const data = await ajax_post(url_api.vote_create, { vote_name, create_user, vote_img: fileList })
            if (data.status === status_enum.success_info) {
                redirect(`${url_redirect.vote_update}${data.vote_id}`)
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
        <>
            <Modal
                title="图片"
                visible={model_show}
                cancelText={"返回"}
                okText={"确认"}
                onOk={() => { setModel_show(false) }}
                onCancel={() => { setModel_show(false) }}

            >


                <Upload listType={"picture-card"} action={'/api/picture/upload'} name={'file'} fileList={fileList} beforeUpload={(file, fileList) => { return beforeUpload(file, fileList) }} onChange={(info) => { onChange(info) }}
                    onRemove={(info) => {
                        setFile_picture([])


                        return true
                    }}>
                    <Button >
                        <Icon type="upload" /> 点击上传
    </Button>

                </Upload>



            </Modal>
            <Layout>

                <Manage_head page_name={"survey_create"} ></Manage_head>

                <h1 className="create_h1">人气投票</h1>
                <Row type="flex" justify="center" align="middle">
                    <Col >
                    <div style={{marginBottom:"18px"}}>
                        <label className="create_label">投票名称</label>
                        <input type="text" className="ant-input create_input" value={project_name} onChange={(e) => {
                            setProject_name(e.target.value)
                        }} />
                        </div>
                        <label className="create_label">图片封面</label>
                        <Tooltip title="上传封皮">

                            <Button style={{marginLeft:"10px"}} onClick={() => {

                                setModel_show(true)
                            }}><Icon type="upload" /></Button></Tooltip>
                        <Button type="primary" className="create_button" onClick={check}>立即创建</Button>
                    </Col>
                </Row>

                <Footer style={{ textAlign: 'center' }}>
                    大同科技 ©2019 Created by vsxq</Footer>
            </Layout>
        </>
    )
}
