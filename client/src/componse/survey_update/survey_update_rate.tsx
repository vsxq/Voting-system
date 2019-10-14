import { useContext, useState } from 'react'

import * as React from 'react';

import {  type_quesition } from "../../utils/enum"
import { Context, } from "../../redux/survey_update_redux"
import { Select, Switch, Button, message } from 'antd';
export const Edit_rate_row = () => {
    const Option = Select.Option;
    const { state, dispatch } = useContext(Context);

    const [question_text, setQuestion_text] = useState(state.will_editing_data.question_text)
    const [is_require, setIs_require] = useState(state.will_editing_data.is_require)
    const [rate, setRate] = useState(state.will_editing_data.rate)

    const cancel_update=()=>{
        dispatch({type:"CANCEL_UPDATE"})
    }

    const check = () => {

        if (question_text !== "") {
            const data = { question_text, is_require, id: state.will_editing_data.id, question_type: type_quesition.rate, rate: rate, }
            
            dispatch({ type: "UPDATE_ITEM_END", payload: data })
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
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={is_require}  onChange={
                    (e) => { setIs_require(e) }
                } />
            </div>

            <div className={"edit-item edit-before-upload"} >
                <label className={"edit_label"}>星星总数</label>
                <Select onChange={(e: any) => {
                    setRate(e)


                }} defaultValue={rate}>

                    <Option value={5} >5个星星</Option>
                    <Option value={10} >10个星星</Option>
                    <Option value={15} >15个星星</Option>
                    <Option value={20} >20个星星</Option>


                </Select>
            </div>



        </div>
        <div className={"edit-item"}><Button type="primary" className={"edit_button_submit"} onClick={check}>提交</Button>
        <Button type="primary" className={"edit_button_submit"} onClick={cancel_update}>取消修改</Button>
        </div>

    </>
}