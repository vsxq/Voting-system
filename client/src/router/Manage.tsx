import * as React from 'react';
import { Layout, Row, Col, message, Button, Dropdown, Menu, Modal, DatePicker, Switch } from 'antd';
import { Manage_head } from "../componse/header"
import { redirect } from "../utils/base_utils"
import { url_redirect } from '../utils/url_redirect'
import { ajax_post } from "../utils/ajax"
import { useEffect, useState, useReducer, useContext } from "react"
import { survey_list, survey_delete, survey_extra_url, url_api } from "../utils/url"
import { status_enum } from "../utils/enum"
import { reducer, initValue, Context } from "../redux/manage_redux"

export const Guide = () => {
    return (
        <Row type="flex" justify="center" align="middle">
            <Col span={12} offset={6}>
                <img style={{ margin: "58px 0px 0px 0px" }} src="/img/guide.png"></img>
                <h3 style={{ color: "#808080" }}>您还没有创建过投票 ,马上去创建吧!!!</h3>


                <a style={{

                    fontSize: "22px"
                    , width: "160px",
                    height: "48px",
                    backgroundColor: "#1890ff",
                    border: "solid",
                    borderColor: "#1890ff",
                    borderRadius: "100px",
                    color: "#ffff",
                    display: "inline-block",
                    textAlign: "center",
                    padding: "3px 9px 6px 9px",
                    margin: "34px 20px 92px -26px"
                }} href={url_redirect.survey_create} >问卷调查</a>  <a className={"create_vote_button"} href={url_redirect.vote_create}>人气投票</a>
            </Col>
        </Row>

    )
}


export const Survey_item = ({ ...props }) => {

    const value = props.data
    const { survey_name, survey_id, survey_extra } = value

    const [extra, setExtra] = useState(false)
    const edit_url = `${url_redirect.survey_update}/${survey_id}`

    const menu = (<Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href={edit_url}>
                编辑问卷
          </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" onClick={() => { setExtra(true) }}>
                问卷设置
          </a>
        </Menu.Item>

    </Menu>)

    const { state, dispatch } = useContext(Context);
    const [visible, setVisible] = useState(false)
    const [publish, setPublish] = useState(false)
    const [limit_ip, setIp_limit] = useState(survey_extra.limit_ip)
    const extra_survey = async () => {


        const data = await ajax_post(survey_extra_url, { survey_id, survey_extra: { ...survey_extra, limit_ip } })
        const status = data.status
        switch (Number(status)) {
            case status_enum.success_info: message.success("修过成功"); break
            case status_enum.error: message.warning("修改失败,或者该问卷已经发布"); break;
            default: message.error("未知错误")
        }
    }

    const delete_survey = async () => {
        const data = await ajax_post(survey_delete, { survey_id })
        const status = data.status
        switch (Number(status)) {
            case status_enum.delete_success: message.success("删除成功"); dispatch({ type: "DELETE", payload: survey_id }); break
            case status_enum.delete_fail: message.warning("该项目不存在，请不要重复操作"); break;
            default: message.error("未知错误")
        }


    }
    const publish_survey = async () => {
        console.log({ survey_id, survey_extra: { ...survey_extra, limit_ip, publish: true } })
        const data = await ajax_post(survey_extra_url, { survey_id, survey_extra: { ...survey_extra, limit_ip, publish: true } })
        const status = data.status
        switch (Number(status)) {
            case status_enum.success_info: message.success("发布成功");
                message.success("问卷已在新窗口打开");
                window.open("/survey/record/" + survey_id);
                break
            case status_enum.error: message.warning("发布失败，请刷新页面"); break;
            default: message.error("未知错误")
        }
    }
    return (<div className="survey_item">
        <div className="survey_item_top"><span>问卷：{survey_name}</span></div>
        <div className="survey_item_button">
            <div className="survey_item_button_left">
                <Dropdown overlay={menu}>
                    <Button onClick={() => { redirect(edit_url) }}>设计问卷</Button>
                </Dropdown>
                <Button onClick={() => {
                    if (!survey_extra.publish) { setPublish(true) } else { message.warning("该问卷已经发布，请不要重复发布") }
                }}>发布问卷</Button>
                <Button onClick={() => { redirect(url_redirect.survey_analysis + survey_id) }}>问卷分析</Button>
            </div>
            <div className="survey_item_button_right">
                <Button onClick={() => { setVisible(true) }}>删除问卷</Button>
            </div>
        </div>
        <Modal
            title=""
            visible={publish}
            onOk={() => { publish_survey(); setPublish(false) }}
            onCancel={() => { setPublish(false) }}
        >
            <p>发布后就无法修改问卷了，您确定发布吗？</p>

        </Modal>


        <Modal
            title=""
            visible={extra}
            onOk={() => { extra_survey(); setExtra(false) }}
            onCancel={() => { setExtra(false) }}
        >
            <p>修改问卷{survey_name}属性</p>

            ip限制：<Switch checkedChildren="限制" unCheckedChildren="不限" defaultChecked={limit_ip}
                onChange={(e) => {
                    setIp_limit(e)
                    console.log(e)
                }} />



        </Modal>
        <Modal
            title=""
            visible={visible}
            onOk={() => { delete_survey(); setVisible(false) }}
            onCancel={() => { setVisible(false) }}
        >
            <p>你确认删除 “{survey_name}” 吗？</p>

        </Modal>
    </div>)
}
export const Vote_item = ({ ...props }) => {

    const value = props.data
    const { vote_id, vote_name } = value



    const menu = (<Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href={""}>
                编辑问卷
          </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" onClick={() => { }}>
                问卷设置
          </a>
        </Menu.Item>

    </Menu>)

    const { state, dispatch } = useContext(Context)
        ;
    const [visible, setVisible] = useState(false)
    const delete_vote = async () => {
        const data = await ajax_post(url_api.vote_delete, { vote_id })
        const status = data.status
        switch (Number(status)) {
            case status_enum.delete_success: message.success("删除成功"); dispatch({ type: "DELETE", payload: vote_id }); break
            case status_enum.delete_fail: message.warning("该项目不存在，请不要重复操作"); break;
            default: message.error("未知错误")
        }


    }
    return (<div className="survey_item">
        <div className="survey_item_top" style={{ backgroundColor: "rgba(182, 151, 209, 0.795)" }}><span>投票：{vote_name}</span></div>
        <div className="survey_item_button">
            <div className="survey_item_button_left">
                <Dropdown overlay={menu}>
                    <Button onClick={() => { redirect("") }}>设计投票</Button>
                </Dropdown>
                <Button onClick={() => {
                    redirect("/vote/update/" + vote_id)
                }}>管理角色</Button>
                <Button onClick={() => { redirect(`/vote/analysis/${vote_id}`) }}>查看榜单</Button>
            </div>
            <div className="survey_item_button_right">
                <Button onClick={() => { setVisible(true) }}>删除投票</Button>
            </div>
        </div>



        <Modal
            title=""
            visible={visible}
            onOk={() => { delete_vote() setVisible(false) }}
            onCancel={() => { setVisible(false) }}
        >
            <p>你确认删除 “{vote_name}” 吗？</p>

        </Modal>
    </div>)
}
export const Manage = () => {
    const [state, dispatch] = useReducer(reducer, initValue)
    const username = localStorage.getItem("username")
    console.log(username)
    if (username === undefined || username === null) {
        redirect(url_redirect.login)
        return <></>
    }
    //向后端发送请求 

    const {
        Footer, Sider, Content,
    } = Layout;
    const [has_list, setHas_list] = useState(true)
    useEffect(() => {
        const authority = async () => {
            const survey_data = await ajax_post(survey_list)
            const survey_ajax_status = Number(survey_data.status)
            const vote_data = await ajax_post(url_api.vote_list)
            const vote_ajax_status = Number(vote_data.status)

            if (survey_ajax_status === status_enum.success_info) {

                const render_data = survey_data.data.map((value: any) => {
                    return { ...value, type: "survey" }
                })

                dispatch({ type: "INITIAL", payload: render_data })


            }
            if (vote_ajax_status === status_enum.success_info) {
                const render_data = vote_data.data.map((value: any) => {
                    return { ...value, type: "vote" }
                })

                dispatch({ type: "INITIAL", payload: render_data })

            }

            if (vote_data.data.length + survey_data.data.length > 0) {
                setHas_list(true)
            }

        }

        authority()

    }, [])
    useEffect(() => {
        if (state.length === 0) {
            setHas_list(false)
        }

    }, [state])

    return (
        <>

            <Layout>
                <Manage_head page_name={"manage"}></Manage_head>
                <Content style={{ marginTop: "20px" }}>
                    {has_list ? (
                        <Row>
                            <Col span={12} offset={6} >
                                <div>
                                    <a className={"create_vote_button"} style={{ width: "100px", height: "40px", marginTop: "30px", marginBottom: "15px" }} href={url_redirect.survey_create}>问卷</a>
                                    <a className={"create_vote_button"} style={{ width: "100px", height: "40px", marginTop: "30px", marginBottom: "15px", marginLeft: "37px", }} href={"/vote/create"}>投票</a>
                                </div>
                            </Col>
                            <Context.Provider value={{ state, dispatch }}>
                                <Col span={12} offset={6} >
                                    {state.map((value) => (
                                        (value.type === "survey") ? (<Survey_item key={value.survey_id} data={value}></Survey_item>) :
                                            (<Vote_item data={value} key={value.vote_id}></Vote_item>)



                                    ))}
                                </Col>
                            </Context.Provider>
                        </Row>) : (
                            <Guide></Guide>


                        )}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    大同科技 ©2019 Created by vsxq</Footer>
            </Layout>




        </>
    )
}