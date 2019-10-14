import { useContext, useState } from 'react'
import { useReducer } from "react"
import * as React from 'react';

import { type_quesition } from "../../utils/enum"
import { Context, } from "../../redux/survey_update_redux"
import { Context_answer, initValue, reducer } from "../../redux/answers_redux"
import { Switch, Upload, Icon, Button, message, Slider, Tooltip } from 'antd';

import { Answer_area } from "../../componse/answer_edit"





export const Edit_checkbox_row = () => {
    const [state, dispatch] = useReducer(reducer, initValue)
    const total_context = useContext(Context);
    const total_state = total_context.state
    const total_dispatch = total_context.dispatch

    const [question_text, setQuestion_text] = useState(total_state.will_editing_data.question_text)
    const [is_require, setIs_require] = useState(total_state.will_editing_data.is_require)
    const [select_number, setSelect_number] = useState({ min: total_state.will_editing_data.min_number, max: total_state.will_editing_data.max_number })


    const cancel_update = () => {
        total_dispatch({ type: "CANCEL_UPDATE" })
    }


    //赋值
    React.useEffect(() => {
        dispatch({ type: "INIT", payload: total_state.will_editing_data.answers })
    }, [])

    function check() {
        if (question_text !== "" && state.length >= 2) {

            const min_number = select_number.min
            const max_number = select_number.max


            const data = { question_text, is_require, answers: state, id: total_state.will_editing_data.id, min_number, max_number, question_type: type_quesition.checkbox }
            total_dispatch({ type: "UPDATE_ITEM_END", payload: data })
        }
        else {
            message.error("请检查输入")
        }
    }
    // @ts-ignore
    return (<>

        <div className={"edit-item"}>
            <label className={"edit_label"} >问题</label><input className="ant-input edit-input" type="text" value={question_text} onChange={(e) => {

                setQuestion_text(e.target.value)
            }} />
        </div>
        <div className={"edit-item"}>
            <label className={"edit_label"}>必答</label>
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={is_require} onChange={
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
            <Slider className={"slider"} range defaultValue={Object.values(select_number)} max={state.length} min={1} tooltipVisible={true} onChange={(e) => {
    setSelect_number({min: e[0], max: e[1]})
}}/>
        </div>


        <div className={"edit-item"}><Button type="primary" className={"edit_button_submit"} onClick={check}>提交</Button>
            <Button type="primary" className={"edit_button_submit"} onClick={cancel_update}>取消修改</Button>
        </div>

    </>)
}

