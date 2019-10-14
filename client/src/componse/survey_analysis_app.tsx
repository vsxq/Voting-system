import * as React from 'react';
import {type_quesition} from "../utils/enum"
import {Survey_radio} from "./survey_analysis/survey_radio"
import {Survey_rate} from "./survey_analysis/survey_rate"
import {Survey_checkbox} from "./survey_analysis/survey_checkbox"
import {Survey_text} from "./survey_analysis/survey_text"
export const Survey_analysis_app=({...props})=>{
    const quesiton_type=Number(props.question_type)
    switch (quesiton_type) {
        case type_quesition.radio:return (<Survey_radio></Survey_radio>);
        case type_quesition.rate:return (<Survey_rate></Survey_rate>);
        case type_quesition.checkbox:return (<Survey_checkbox></Survey_checkbox>);
        case type_quesition.text:return (<Survey_text></Survey_text>);
        default:throw new Error("未知的类型")
    }
}