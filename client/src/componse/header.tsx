import * as React from 'react';
import { Layout, Menu, Icon, Dropdown, message,Modal } from 'antd';
import { url_redirect } from '../utils/url_redirect'
import { redirect, show_id, goto_login } from "../utils/base_utils"
import { Context as Survey_context, } from "../redux/survey_update_redux"
import { Context as Vote_context, } from "../redux/vote_update_redux"
import { useContext,useState } from "react"
import { ajax_post } from '../utils/ajax';
import { status_enum } from '../utils/enum';
import { url_api } from '../utils/url';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '/js/iconfont.js',
});


const Drop_menu = () => {
    return (
        <Menu theme="dark" style={{ fontSize: "17px" }}>

            
            <Menu.Item>
                <a rel="noopener noreferrer" href={url_redirect.vip}>vip</a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href={url_redirect.change_passwd}>重置密码</a>
            </Menu.Item>
            
        </Menu>
    )
};
const Head_title = (page_name: string, name?) => {
    switch (page_name) {
        case "survey_create": return (
            <a style={{ color: "#fff", padding: "7px 0px 0px 30px", display: "inline-block" }} href="javascript:history.go(-1)">
                <IconFont type="icon-fanhui" />
                返回</a>
        )
        case "manage": return (
            <span style={{ color: "#fff", padding: "7px 0px 0px 30px", display: "inline-block" }} >投票系统</span>)
        case "update_survey": return (
            <span style={{ color: "#fff", padding: "7px 0px 0px 30px", display: "inline-block" }} >问卷名称:{name}</span>)
        case "update_vote": return (
                <span style={{ color: "#fff", padding: "7px 0px 0px 30px", display: "inline-block" }} >人气投票:{name}</span>)
        default: return (<span style={{ color: "#fff", padding: "7px 0px 0px 30px", display: "inline-block" }}> {page_name}</span>)

    }

}

export const Manage_head = ({ ...props }) => {
    const username = localStorage.getItem("username")
    const [visible, setVisible] = useState(false)

    const {
        Header
    } = Layout;
    const logout = async()=>{
        const data=await ajax_post(url_api.logout_url)
        if(Number(data.status)===status_enum.success_info){
            localStorage.clear()
            message.success("2s后转向登录界面")
            setTimeout(() => {
                redirect(url_redirect.login)
            }, 2000);
        }
    }    


    return (<Header style={{ clear: "both", lineHeight: "54px", padding: "0 10px", fontSize: "18px" }}>
        {Head_title(props.page_name)}
        <Modal
            title=""
            visible={visible}
            onOk={() => {  logout(); setVisible(false) }}
            onCancel={() => { setVisible(false) }}
        >
            <p>你确认注销吗？</p>

        </Modal>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', fontSize: "18px" }}
        >

            <Menu.Item key="1"><IconFont type="icon-user" />
                <Dropdown overlay={Drop_menu()} placement="bottomCenter" >
                    <span style={{ fontWeight: "bold" }}>{username}</span>
                </Dropdown>
            </Menu.Item>
            
            <Menu.Item key="2" onClick={() => { setVisible(true)}} ><IconFont type="icon-log-out-o" />登出</Menu.Item>

        </Menu>

    </Header>)
}
export const Vote_update_head = ({ ...props }) => {
    const { state, dispatch } = useContext(Vote_context);

    async function save_update_data(ok_function: Function, fail_function: Function) {


        const survey_id = state.id;


        const question_container = state.question_array
        const will_upload_data = { survey_id, question_container }
        const data = await ajax_post("/api/survey/update_question", will_upload_data)
        if (data.status === status_enum.success_info) {
            ok_function()
        }
        else {
            fail_function()
        }
    }



    const project_name = state.vote_name
    const username = localStorage.getItem("username")

    const {
        Header
    } = Layout;



    return (<Header style={{ clear: "both", lineHeight: "54px", padding: "0 10px", fontSize: "18px" }}>
        {Head_title("update_vote", project_name)}
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', fontSize: "18px" }}
        >

            <Menu.Item key="1"><IconFont type="icon-user" />
                <Dropdown overlay={Drop_menu()} placement="bottomCenter" >
                    <span style={{ fontWeight: "bold" }}>{username}</span>
                </Dropdown>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => {
                save_update_data(
                    () => { message.success("保存成功") }, () => { message.error("保存失败") }
                )
            }}><IconFont type="icon-xiaoxi" />保存</Menu.Item>

        </Menu>

    </Header>)

}

export const Survey_update_head = ({ ...props }) => {
    const { state, dispatch } = useContext(Survey_context);

    async function save_update_data(ok_function: Function, fail_function: Function) {


        const survey_id = state.id;


        const question_container = state.question_array
        const will_upload_data = { survey_id, question_container }
        const data = await ajax_post("/api/survey/update_question", will_upload_data)
        if (data.status === status_enum.success_info) {
            ok_function()
        }
        else {
            fail_function()
        }
    }



    const project_name = props.name
    const username = localStorage.getItem("username")

    const {
        Header
    } = Layout;



    return (<Header style={{ clear: "both", lineHeight: "54px", padding: "0 10px", fontSize: "18px" }}>
        {Head_title("update_survey", project_name)}
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', fontSize: "18px" }}
        >

            <Menu.Item key="1"><IconFont type="icon-user" />
                <Dropdown overlay={Drop_menu()} placement="bottomCenter" >
                    <span style={{ fontWeight: "bold" }}>{username}</span>
                </Dropdown>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => {
                save_update_data(
                    () => { message.success("保存成功") }, () => { message.error("保存失败") }
                )
            }}><IconFont type="icon-xiaoxi" />保存</Menu.Item>

            <Menu.Item key="3" onClick={() => {
                save_update_data(
                    () => { message.success("保存成功,2s后去预览") }, () => { message.error("保存失败") }
                )
                setTimeout(() => { redirect(url_redirect.survey_preview + state.id) }, 2000)
            }} ><IconFont type="icon-log-out-o" />预览</Menu.Item>

        </Menu>

    </Header>)
}