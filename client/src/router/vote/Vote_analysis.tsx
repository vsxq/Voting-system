import * as React from 'react';
import { status_enum } from "../../utils/enum" //状态{status,message}
import { ajax_post, ajax_get } from "../../utils/ajax"//ajax方法
import echarts from 'echarts'
import { Head } from "../../componse/survey_analysis/head"
import { Manage_head } from "../../componse/header"
import { Survey_analysis_app } from "../../componse/survey_analysis_app"
import { url_api } from "../../utils/url"
import { Layout, Row, Col, Button, Modal, message } from 'antd';
import { Table as Antd_table, } from 'antd';
import { redirect, toast_error, goto_login, add_id } from "../../utils/base_utils"
import { useState, useEffect, createContext } from "react"


export function Vote_analysis({ ...props }) {
    const {
        Footer, Content,
    } = Layout;
    const vote_id = props.match.params.id
    //首先进行本地是否有
    const username = localStorage.getItem("username")
    if (username === undefined || username === null) {
        goto_login()
        return <></>
    }
    //检查该用户是否有对id修改的权限

    const [has_auth, setHas_auth] = useState(false)
    const [data_cache, setData_cache] = useState([])
    useEffect(() => {
        const authority = async () => {
            const data = await ajax_post(url_api.vote_record, { vote_id })
            if (Number(data.status) === status_enum.success_info) {
                const { page_view, vote_count } = data
                const { vote_id, vote_img, vote_name, player_container } = data.data
                const q = player_container.map((value) => {

                    const find_data = vote_count.find((va) => { if (Object.keys(va)[0] === value.player_id) return true })
                    return { ...value, count: Number(Object.values(find_data)[0]) }
                })
                const w = q.sort((b, a) => { return a.count - b.count })




                console.log(w)
                setData_cache(w)

                setHas_auth(true)






            }
            else if (Number(data.status) === status_enum.illegal_survey) {
                message.error("不存在")
            }
            else {
                message.error("服务器异常")
            }

        }
        authority()

    }, [])
    const data_source = data_cache.map((value, index) => {

        return {
            key: index + 1,
            option: value.player_name,
            sum: value.count - 1
        }
    })
    const columns = [
        {
            title: '名字',
            dataIndex: 'option',
            key: 'option',
        },
        {
            title: '票数',
            dataIndex: 'sum',
            key: 'sum',
        },

    ];

    return (<>

        {has_auth ? (<>
            <Manage_head page_name="数据分析"></Manage_head>
            <Row>
                <Col span={18} offset={3} >
                    <Antd_table className="analysis_table" align="center" dataSource={data_source} columns={columns} pagination={false} />
                </Col></Row>



        </>) : (<></>)}
    </>)
}
