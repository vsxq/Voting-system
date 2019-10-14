import { useContext, useState } from 'react'
import { useReducer } from "react"
import * as React from 'react';
import { get_id } from "../../utils/base_utils"
import {  type_quesition, input_check } from "../../utils/enum"
import { Context, } from "../../redux/survey_update_redux"

import { Select, Switch,  Button, message } from 'antd';
export const Edit_rate_row = () => {
    const Option = Select.Option
    const [question_text, setQuestion_text] = useState("")
    const [is_require, setIs_require] = useState(true)
    const [rate, setRate] = useState(5)
    const {  dispatch } = useContext(Context);
    
   

    const check = () => {

        if (question_text !== "") {
            const data = { question_text, is_require, id: get_id(), question_type: type_quesition.rate, rate: rate,  }
            
            dispatch({ type: "ADD", payload: data })
        }
        else {
            
            message.error("请检查输入")
        }
    }
    return <>
        <div className={"edit-item"}>
            <label className={"edit_label"}>问题</label><input className="ant-input edit-input" type="text" value={question_text} onChange={(e) => {
                setQuestion_text(e.target.value)
            }} />
        </div>
        <div className={"edit-function"}>
            <div className={"edit-item"}>
                <label className={"edit_label"}>必答</label>
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={
                    (e) => { setIs_require(e) }
                } />
            </div>
     
            <div className={"edit-item edit-before-upload"} >
                <label className={"edit_label"}>星星总数</label>
                <Select onChange={(e:any) => {
                    setRate(e)

                }} defaultValue={5}>
                   
                        <Option value={5} >5个星星</Option>
                        <Option value={10} >10个星星</Option>
                        <Option value={15} >15个星星</Option>
                        <Option value={20} >20个星星</Option>

                    
                </Select>
            </div>


        </div>
        <div className={"edit-item"}><Button type="primary" className={"edit_button_submit"} onClick={check}>提交</Button></div>

    </>
}