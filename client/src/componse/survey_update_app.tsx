import { useContext, useState } from 'react'
import * as React from 'react';
import { type_question_object, type_quesition, input_check } from "../utils/enum"
import { Context, } from "../redux/survey_update_redux"
import { Select} from 'antd';
import {Edit_text_row} from "../componse/survey_update/survey_update_text"
import {Edit_radio_row} from "../componse/survey_update/survey_update_radio"
import {Edit_checkbox_row} from "../componse/survey_update/survey_update_checkbox"
import {Edit_rate_row} from "../componse/survey_update/survey_update_rate"


const Option = Select.Option;
export const Edit_select_new_problem_type = () => {
    const { state, dispatch } = useContext(Context);
    return (<>
        <div className="update_select_div">
            <label>请选择问题类型
                            <Select className={"update_select_select"} disabled onChange={(e) => {
                    
                    
                    dispatch({ type: "CHANGE_TYPE", payload: { new_question_type: e } })

                }} defaultValue={state.will_editing_data.question_type}>
                    {Object.keys(type_question_object).map((key, index) => (
                        <Option value={index} key={key}>{type_question_object[key]}</Option>
                    ))

                    }
                </Select>
            </label>

        </div>
    </>)
}


export const Edit_edit_row = () => {
    const { state } = useContext(Context);

    switch (Number(state.will_editing_data.question_type)) {
        case type_quesition.radio: return <Edit_radio_row></Edit_radio_row>
        case type_quesition.text: return <Edit_text_row></Edit_text_row>
        case type_quesition.checkbox:return<Edit_checkbox_row></Edit_checkbox_row>
        case type_quesition.rate:return <Edit_rate_row></Edit_rate_row>
        default: console.log(Number(state.will_editing_data.question_type)); throw new Error("未知类型");

    }


}