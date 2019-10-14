import { useContext, useState } from 'react'
import { useReducer } from "react"
import * as React from 'react';
import { get_id } from "../../utils/base_utils"
import {  type_quesition } from "../../utils/enum"
import { Context, } from "../../redux/survey_update_redux"
import { Context_answer, initValue, reducer } from "../../redux/answers_redux"
import {  Switch, Button, message } from 'antd';
import { Answer_area } from "../../componse/answer_edit"


export const Edit_radio_row = () => {
    const [state, dispatch] = useReducer(reducer, initValue)
    const total_context = useContext(Context);

    const total_dispatch = total_context.dispatch

    const [question_text, setQuestion_text] = useState("")
    const [is_require, setIs_require] = useState(true)
    
    
    function check() {
        if (question_text !== "" && state.length >= 2) {
            
            const data = { question_text, is_require, answers:state, id: get_id() ,question_type:type_quesition.radio}
            total_dispatch({ type: "ADD", payload: data })
        }
        else {
            message.error("请检查输入")
        }
    }
    return (<>

        <div className={"edit-item"}>
            <label className={"edit_label"} >问题</label><input id="asd" name="dfg" className="ant-input edit-input" type="text" value={question_text} onChange={(e) => {
                console.log(e)
                setQuestion_text(e.target.value)
            }} />
        </div>
        <div className={"edit-item"}>
            <label className={"edit_label"}>必答</label>
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={
                (e) => { setIs_require(e) }
            } />
        </div>
        <div className={"edit-item"}>
            <Context_answer.Provider value={{ state, dispatch }}>
                <Answer_area></Answer_area>
            </Context_answer.Provider>
        </div>

        <div className={"edit-item"}><Button type="primary" className={"edit_button_submit"} onClick={check}>提交</Button></div>

    </>)
}

