import * as React from 'react';
import { useContext, useState } from "react"

import { Question_context } from "../../router/survey/survey_analysis"
export const Survey_head = ({...props}) => {
    const question_type_chinese=props.type
    const data = useContext(Question_context)
    const { question_text, index } = data
    return(
<div className="analysis-item-head">
            第{index+1}题：{question_text}  <span>[{question_type_chinese}]</span>
        </div>
    )
}