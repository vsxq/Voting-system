import { useContext, useState } from 'react'
import { useReducer } from "react"
import * as React from 'react';
import { get_id } from "../../utils/base_utils"
import { type_quesition } from "../../utils/enum"
import { Context, } from "../../redux/survey_update_redux"
import { Context_answer, initValue, reducer } from "../../redux/answers_redux"
import {  Switch, Button, message, Slider, Tooltip } from 'antd';
import { Answer_area } from "../../componse/answer_edit"



export const Edit_checkbox_row = () => {

    const [state, dispatch] = useReducer(reducer, initValue)
    const [question_text, setQuestion_text] = useState("")
    const [is_require, setIs_require] = useState(true)
    const [select_number, setSelect_number] = useState({ min: 1, max: 2 })
    const total_context = useContext(Context);

    const total_dispatch = total_context.dispatch

    function check() {
        if (question_text !== "" && state.length >= 2) {

            const min_number = select_number.min
            const max_number = select_number.max

            const data = { question_text, is_require, answers: state, id: get_id(), min_number, max_number, question_type: type_quesition.checkbox }
            total_dispatch({ type: "ADD", payload: data })
        }
        else {
            message.error("请检查输入")
        }
    }
    return (<>

        <div className={"edit-item"}>
            <label className={"edit_label"} >问题</label><input  className="ant-input edit-input" type="text" value={question_text} onChange={(e) => {
    
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
        <div className={"edit-item"}>
            <Tooltip title="多选中的可以选择的项数,左侧的是最少可以选择的项数，右侧是最多可以选择的项数"><label className={"edit_label"}>可选项</label></Tooltip>
            <Slider className={"slider"} range defaultValue={[1, 2]} max={state.length} min={1} tooltipVisible={true} onChange={(e) => { setSelect_number({ min: e[0], max: e[1] }) }}></Slider>
        </div>

        <div className={"edit-item"}><Button type="primary" className={"edit_button_submit"} onClick={check}>提交</Button></div>

    </>)
}

