import { useContext } from 'react'
import * as React from 'react';
import { type_question_object, type_quesition, input_check } from "../utils/enum"
import { Context, } from "../redux/survey_update_redux"
import { Select } from 'antd';
import { Edit_text_row } from "../componse/survey_create/survey_create_text"
import { Edit_radio_row } from "../componse/survey_create/survey_create_radio"
import { Edit_checkbox_row } from "../componse/survey_create/survey_create_checkbox"
import { Edit_rate_row } from "../componse/survey_create/survey_create_rate"

export const Add_select_new_problem_type = () => {
    const Option = Select.Option;
    const { state, dispatch } = useContext(Context);
    return (<>
        <div className="update_select_div">
            <label>请选择问题类型
                            <Select className={"update_select_select"} onChange={(e) => {
                    console.log(e)
                    dispatch({ type: "CHANGE_TYPE", payload: { new_question_type: e } })

                }} defaultValue={state.new_question_type}>
                    {Object.keys(type_question_object).map((key, index) => (
                        <Option value={index} key={key}>{type_question_object[key]}</Option>
                    ))

                    }
                </Select>
            </label>

        </div>
    </>)
}


export const Add_edit_row = () => {
    const { state } = useContext(Context);

    switch (Number(state.new_question_type)) {
        case type_quesition.radio: return <Edit_radio_row></Edit_radio_row>
        case type_quesition.text: return <Edit_text_row></Edit_text_row>
        case type_quesition.checkbox: return <Edit_checkbox_row></Edit_checkbox_row>
        case type_quesition.rate: return <Edit_rate_row></Edit_rate_row>
        default: console.log(Number(state.new_question_type)); throw new Error("未知类型");

    }


}