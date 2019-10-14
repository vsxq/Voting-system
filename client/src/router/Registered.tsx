import * as React from 'react';
import { useInputValue, redirect } from "../utils/base_utils"
import { useState } from "react"
import { ajax_get, ajax_post } from "../utils/ajax"
import { status_enum } from "../utils/enum"
import { registered_url, repeat_user_name_url } from "../utils/url"
import { Radio, Button, Form, Input, Row, Col, message } from 'antd';
import { Select } from 'antd';
import { url_redirect } from "../utils/url_redirect"
import {vip_type} from "../utils/enum"
export const Registered = () => {

    const check = async () => {
        const { repeat_user_name, passwd_equal_repasswd } = status
        if (repeat_user_name && passwd_equal_repasswd && passwd.value !== "") {
            const data = (await ajax_post(registered_url, { user: user.value, passwd: passwd.value ,level:vip}))
            if (data.status === status_enum.success_info) {
                message.success("注册成功")
                message.success("2s后将跳转到登录页面")
                setTimeout(() => {
                    redirect(url_redirect.login)
                }, 2000);
            }
            else if (data.status === status_enum.registered_repeat_user_name) {
                message.warning("不要重复提交,以上一次提交为准")
            }
            else {
                console.log(data)
            }
        }
        else {
            message.error("请检查输入")
        }

    }
    const Option = Select.Option;
    const user = useInputValue("")
    const passwd = useInputValue("")
    const repasswd = useInputValue("")
    const [info, setInfo] = useState({
        validateStatus: 'success',
        errorMsg: null,
    })
    const [passwd_info, setPasswdinfo] = useState({
        validateStatus: 'success',
        errorMsg: null,
    })
    const [vip,setVip]=useState("normal")
    const [status, setStatus] = useState({ passwd_equal_repasswd: false, repeat_user_name: false })
    React.useEffect(() => {
        if (user.value === "")
            return
        const get_repeat_user_name = async () => {
            const data = await ajax_get(repeat_user_name_url, { user: user.value })
            if (data.status === status_enum.success_info) {
                setStatus({ ...status, repeat_user_name: true })
                setInfo({
                    validateStatus: 'success',
                    errorMsg: null,
                })
            }
            else {
                setStatus({ ...status, repeat_user_name: false })
                setInfo({
                    validateStatus: 'error',
                    errorMsg: '重复的用户名',
                })
            }
        }
        get_repeat_user_name()
    }, [user.value]
    )

    return (
        <><Row>
            <Col span={12} offset={6} >
                <div className="registered_card">
                    <Form className="login-form">
                        <Form.Item
                            validateStatus={info.validateStatus}
                            help={info.errorMsg} className="registered_card_input">
                            <div className="registered_card_span">用户名</div><Input value={user.value}  onChange={user.onChange}
                            />
                        </Form.Item></Form>

                        <Form.Item className="registered_card_input">
                        <div className="registered_card_span">密码</div><Input type="password" value={passwd.value}  placeholder="请输入密码" onChange={(e) => {
                        passwd.onChange(e)


                        if (e.target.value === repasswd.value) {
                            setStatus({ ...status, passwd_equal_repasswd: true })
                        }
                        else {
                            setStatus({ ...status, passwd_equal_repasswd: false })
                            
                        }

                    }} />
                    </Form.Item>
                    <Form.Item
                        validateStatus={passwd_info.validateStatus}
                        help={passwd_info.errorMsg} className="registered_card_input">
                        <div className="registered_card_span">确认密码</div><Input type="password" value={repasswd.value}  onChange={(e) => {
                            repasswd.onChange(e)
                            if (e.target.value === passwd.value) {
                                setStatus({ ...status, passwd_equal_repasswd: true })
                                setPasswdinfo(({
                                    validateStatus: 'success',
                                    errorMsg: null,
                                }))
                            } else {
                                setStatus({ ...status, passwd_equal_repasswd: false })
                                setPasswdinfo({
                                    validateStatus: "error",
                                    errorMsg: "两次输入的密码不一致"
                                })
                            }

                        }}

                        />

                    </Form.Item>
                    <div className="update_select_div">
            <label>请选择用户类型
                            <Select className={"update_select_select"} onChange={(e) => {
                    console.log(e)
                   setVip(e)

                }} defaultValue={Object.keys(vip_type)[0]}>
                    {Object.keys(vip_type).map((key, index) => (
                        <Option value={key} key={key}>{vip_type[key]}</Option>
                    ))

                    }
                </Select>
            </label>

        </div>
                    <Button onClick={check} type="primary" className="registered_card_button">提交</Button>


                </div>

            </Col>
        </Row>



        </>
    )
}