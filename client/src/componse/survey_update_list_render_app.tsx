import { Context, } from "../redux/survey_update_redux"
import { useContext,  createContext } from 'react'
import {  type_quesition } from "../utils/enum"
import * as React from 'react';

import {Render_radio} from "./survey_update_list_render/render_radio"
import {Render_rate} from "./survey_update_list_render/render_rate"
import {Render_checked} from "./survey_update_list_render/render_checkbox"
import {Render_text} from "./survey_update_list_render/render_text"
export const Question_type_context = createContext(null)
const Question_type_context_provider = props => {

    return (
        <Question_type_context.Provider value={{ data: props.data }}>
            {props.children}
        </Question_type_context.Provider>
    )
}

export const Render_list_item = ({ ...props }) => {

    const { state, dispatch } = useContext(Context);
    const { data } = (useContext(Question_type_context))
    const question_type = Number(data.question_type)



    switch (question_type) {
        case type_quesition.radio: return <Render_radio></Render_radio>
        case type_quesition.text: return <Render_text></Render_text>
        case type_quesition.checkbox: return <Render_checked></Render_checked>
        case type_quesition.rate: return <Render_rate></Render_rate>
        default: console.log(Number(state.new_question_type)); throw new Error("未知类型");
    }


}
export const Render_lists = () => {
    const { state } = useContext(Context);
    
    return (<div className={"render"}>


        {
            state.question_array.map((value, index) => (
                <Question_type_context_provider key={value.id} data={{ ...value, index }} index={index}>
                    <Render_list_item key={value.id} data={value}></Render_list_item>
                </Question_type_context_provider>

            ))
        }

    </div >)
}