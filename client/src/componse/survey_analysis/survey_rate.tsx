import * as React from 'react';
import { useContext, useState } from "react"

import { Table as Antd_table } from 'antd';
import { Question_context } from "../../router/survey/survey_analysis"
import {Survey_head} from "./survey_head"
import { Picture } from './picture';
export const Survey_rate = () => {

    const data = useContext(Question_context)
    const {  index, analysis_answers } = data

    const data_source = []
    for (let i in analysis_answers) {
        data_source.push({
            key: i + "34",
            option: i,
            sum: analysis_answers[i]
        })
    }


    const columns = [
        {
            title: '星数',
            dataIndex: 'option',
            key: 'option',
        },
        {
            title: '人数',
            dataIndex: 'sum',
            key: 'sum',
        },

    ];

    return (<div>
        <Survey_head type="评分"></Survey_head>
        <div>
            <Antd_table className="analysis_table"  align="center"  dataSource={data_source} columns={columns} pagination={false} />
            <Picture data={data_source} index={index}></Picture>
        </div>

    </div>)
}