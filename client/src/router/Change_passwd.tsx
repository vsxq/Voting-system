import { useState, useEffect, useCallback } from 'react'
import * as React from 'react';
import { Radio, Button, Form, Input, Row, Col, message } from 'antd';
import { useInputValue, redirect } from "../utils/base_utils"
import { ajax_post } from '../utils/ajax';
import { status_enum } from "../utils/enum"
import { url_redirect } from "../utils/url_redirect"

export const Change_passwd = () => {
    const passwd = useInputValue("")
    const repasswd = useInputValue("")
    const [passwd_info, setPasswdinfo] = useState({
        validateStatus: 'success',
        errorMsg: null,
    })
    const check=async()=>{
        const data=await ajax_post("/api/about_user/change_passwd",{passwd:passwd.value})
        if (data.status === status_enum.success_info) {
            localStorage.clear()
                message.success("重置成功")
                message.success("2s后将跳转到登录页面")
                setTimeout(() => {
                    redirect(url_redirect.login)
                }, 2000);
        }
        else{
            message.warning("服务器异常")
        }
    }
    return (<>
        <Row>
            <Col span={12} offset={6} >
                <div className="registered_card">
                    <Form className="login-form">
                        <div className="waring_note">注意，你正在修改密码</div>
                        <Form.Item className="registered_card_input">
                            <div className="registered_card_span">密码</div><Input type="password" value={passwd.value} placeholder="请输入密码" onChange={(e) => {
                                passwd.onChange(e)




                            }} />
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwd_info.validateStatus}
                            help={passwd_info.errorMsg} className="registered_card_input">
                            <div className="registered_card_span">确认密码</div><Input type="password" value={repasswd.value} onChange={(e) => {
                                repasswd.onChange(e)
                                if (e.target.value === passwd.value) {

                                    setPasswdinfo(({
                                        validateStatus: 'success',
                                        errorMsg: null,
                                    }))
                                } else {

                                    setPasswdinfo({
                                        validateStatus: "error",
                                        errorMsg: "两次输入的密码不一致"
                                    })
                                }

                            }}

                            />

                        </Form.Item>

                    </Form>
                    <Button onClick={check} type="primary" className="registered_card_button">提交</Button>
                </div>
            </Col>
        </Row>
    </>)
}