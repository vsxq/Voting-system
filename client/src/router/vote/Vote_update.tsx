import * as React from 'react';
import { useState, useEffect, useRef, useReducer, useContext } from "react"
//redux
import { reducer, initValue, Context } from "../../redux/vote_update_redux"
//componse
import { Add_select_new_problem_type, Add_edit_row } from "../../componse/survey_add_app"
import { Render_lists } from "../../componse/survey_update_list_render_app"
import { Edit_edit_row, Edit_select_new_problem_type } from "../../componse/survey_update_app"

//util
import { redirect, toast_error, goto_login, add_id, get_id } from "../../utils/base_utils"
import { ajax_post, ajax_get } from "../../utils/ajax"//ajax方法
import { url_api } from "../../utils/url" //重定向的url
import { url_redirect } from '../../utils/url_redirect'//重定向
import { status_enum } from "../../utils/enum" //状态{status,message}
import { beforeUpload } from "../../utils/picture"

//ui
import { Layout, Row, Col, Button, Modal, message, Tooltip, Icon, Upload } from 'antd';
import { Manage_head } from "../../componse/header"
const Vote_item = ({ ...props }) => {
    const value = props.value
    const { player_name, player_id, player_img } = value
    const { state, dispatch } = useContext(Context);
    const [player_name_value, setPlayer_name_value] = useState(player_name)

    const [fileList, setFile_picture] = useState(player_img)
    const [update_model, Show_update_model] = useState(false)
    const [delete_model, Show_delete_model] = useState(false)
    const [model_show, setModel_show] = useState(false)
    const vote_id=props.vote_id
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

    async function edit_player() {
        const will_ajax_data = { player_id, player_name: player_name_value, player_img: fileList }
        const will_submit_data = {
            player_container: state.player_container.map((value) => {
                if (value.player_id === player_id) {
                    return will_ajax_data
                }
                else return value
            })
        }

        const data = await ajax_post("/api/vote/update_player", { player_container:will_submit_data.player_container,vote_id})
        switch (Number(data.status)) {
            case status_enum.success_info:
                dispatch({ type: "EDIT", payload: will_submit_data.player_container })
                Show_update_model(false); message.success("提交成功"); break;
            case status_enum.error: message.error("错误")
            default: message.error("未知错误")
        }

    }
    async function delete_player() {



        const will_submit_data = {
            
                player_container: state.player_container.filter(
                    (value) => {
                        return value.player_id !== player_id
                    })
            
        }
        const data = await ajax_post("/api/vote/update_player",  { player_container:will_submit_data.player_container,vote_id})
        switch (Number(data.status)) {
            case status_enum.success_info:
                console.log(will_submit_data)
                dispatch({ type: "DELETE", payload: will_submit_data.player_container })
                Show_delete_model(false); message.success("提交成功"); break;
            case status_enum.error: message.error("错误")
            default: message.error("未知错误")
        }

    }
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
            <Modal
                title=""
                visible={update_model}
                onOk={() => {
                    if (fileList.length !== 0 && player_name_value !== "") {
                        edit_player(); Show_update_model(false)
                    }
                    else {
                        message.error("请检查输入")
                    }
                }}
                onCancel={() => { Show_update_model(false) }}
            >
                <div className="edit-item">修改角色</div>
                <div className={"edit-item"}>
                    <label className={"edit_label"}>问题</label>
                    <input className="ant-input edit-input" type="text" value={player_name_value}
                        onChange={(e) => {
                            setPlayer_name_value(e.target.value)
                        }} />
                </div>
                <div className={"edit-item"}>
                    <label className={"edit_label"} >上传图片</label>
                    <Tooltip title="上传图片">

                        <Button onClick={() => {
                            setModel_show(true)

                        }}><Icon type="upload" /></Button></Tooltip>
                </div>


            </Modal>
            <Modal
                title=""
                visible={delete_model}
                onOk={() => { delete_player(); Show_delete_model(false) }}
                onCancel={() => { Show_delete_model(false) }}
            >
                <p>你确定要删除选手 “{player_name}” 么？？？</p>

            </Modal>
            <div className="player_item" key={value.player_id}>
                <img className="player_img" src={player_img[0].url}></img>
                <div className="player_name">{player_name}</div>
                <div className="player_btn_box">
                    <Button onClick={() => { Show_update_model(true) }}>修改</Button>
                    <Button className="player_button" onClick={() => { Show_delete_model(true) }}>删除</Button>
                </div>
            </div>
        </>
    )
}










export const Vote_update = ({ ...props }) => {
    const {
        Footer, Content,
    } = Layout;
    const vote_id = props.match.params.id
    //首先进行本地是否有
    const username = localStorage.getItem("username")
    if (username === undefined || username === null) {
        goto_login()
        return <></>
    }
    //检查该用户是否有对id修改的权限
    const [has_auth, setHas_auth] = useState(false)
    const [create_model, Show_create_model] = useState(false)
    const [player_name_value, setPlayer_name_value] = useState("")
    const [state, dispatch] = useReducer(reducer, initValue)
    const create_player = async () => {

        const player_id = get_id()
        //提交数据
        const will_ajax_data = { player_id, player_name: player_name_value, player_img: fileList }
        //
        console.log(will_ajax_data)
        const will_submit_data = { player_container: state.player_container.concat(will_ajax_data), vote_id }
        console.log(will_submit_data)
        console.log(state)
        const data = await ajax_post("/api/vote/update_player", will_submit_data)
        switch (Number(data.status)) {
            case status_enum.success_info: dispatch({ type: "ADD", payload: will_submit_data.player_container })
                Show_create_model(false); message.success("提交成功"); break;
            case status_enum.error: message.error("错误"); break
            default: message.error("未知错误"); break
        }


    }

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
    useEffect(() => {
        const authority = async () => {
            const data = await ajax_post(url_api.vote_before_update, { vote_id })
            if (Number(data.status) === status_enum.success_info) {


                setHas_auth(true)
                const { vote_id, player_container, vote_name, vote_img } = data.data
                const redux_data = { vote_id, player_container, vote_name, vote_img }
                dispatch({ type: "INITIAL", payload: redux_data })


            }
            else { setHas_auth(false) }

        }

        authority()

    }, [])

    return (
        <>
            {has_auth ? (

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

                    <Modal
                        title=""
                        visible={create_model}
                        onOk={async () => {
                            if (fileList.length !== 0 && player_name_value !== "") {
                                await create_player();

                            }
                            else {
                                message.error("请检查输入")
                            }
                        }}
                        onCancel={() => { Show_create_model(false) }}
                    >


                        <div className={"edit-item"}>
                            <label className={"edit_label"}>问题</label><input className="ant-input edit-input" type="text" value={player_name_value} onChange={(e) => {
                                setPlayer_name_value(e.target.value)
                            }} />
                        </div>
                        <div className={"edit-item"}>
                            <label className={"edit_label"} >上传图片</label>
                            <Tooltip title="上传图片">

                                <Button onClick={() => {
                                    setModel_show(true)

                                }}><Icon type="upload" /></Button></Tooltip>
                        </div>
                    </Modal>


                    <Manage_head page_name={"update_vote"}></Manage_head>
                    <Row>
                        <Col span={12} offset={6}>
                            <Button onClick={() => {
                                Show_create_model(true)
                            }} className="player_add">新增选手</Button>
                            <div className="player_list">
                                <Context.Provider value={{ state, dispatch }}>
                                    {state.player_container.map((value) => (
                                        <Vote_item key={value.player_id} value={value} vote_id={vote_id} ></Vote_item>
                                    ))}
                                </Context.Provider>
                            </div>
                        </Col>
                    </Row>


                    <Footer style={{ textAlign: 'center' }}>
                        大同科技 ©2019 Created by vsxq</Footer>



                </>
            ) : (<>
            </>)}
        </>

    )
}
