import * as React from 'react';
import { useContext, useEffect } from "react"
import { Table as Antd_table, Button } from 'antd';
import { Question_context } from "../../router/survey/survey_analysis"
import echarts from 'echarts'
import { Picture } from './picture';
export const Table = () => {
    const data = useContext(Question_context)
    const { answers, analysis_answers, index } = data
    const data_source = answers.map((value, index) => {

        return {
            key: index + 1,
            option: value.text,
            sum: analysis_answers[value.id]
        }
    })
    const columns = [
        {
            title: '选项',
            dataIndex: 'option',
            key: 'option',
        },
        {
            title: '票数',
            dataIndex: 'sum',
            key: 'sum',
        },

    ];
   

    return (<> <Antd_table className="analysis_table" align="center" dataSource={data_source} columns={columns} pagination={false} />
        <Picture data={data_source} index={index}></Picture>

    </>
    )
}