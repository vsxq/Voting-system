import * as React from 'react';
import { Table as Antd_table } from 'antd';
import { Survey_head } from "./survey_head"
import { useContext } from "react"
import { Question_context } from "../../router/survey/survey_analysis"
import { get_id } from '../../utils/base_utils';

export const Survey_text = () => {
    const data = useContext(Question_context)
    const { analysis_answers } = data

    const data_source = []

    for (let i in analysis_answers) {
        const j = Number(analysis_answers[i])
        for (let o = 0; o < j; o++) {
            data_source.push({
                key: i + "34" + Math.random(),

                sum: i
            })
        }
    }


    const columns = [

        {
            title: '答案文本',
            dataIndex: 'sum',
            key: 'sum',
        },

    ];
    return (<div>
        <Survey_head type="文本"></Survey_head>
        <Antd_table className="analysis_table" align="center" dataSource={data_source} columns={columns} />

    </div>)
}