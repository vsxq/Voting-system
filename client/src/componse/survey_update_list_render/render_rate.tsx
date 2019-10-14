import { Context, } from "../../redux/survey_update_redux"
import { useContext, useState, createContext } from 'react'
import { Question_type_context } from "../survey_update_list_render_app"
import {  Button ,Rate} from 'antd';
import * as React from 'react';

export const Render_rate = () => {
    const { state, dispatch } = useContext(Context);
    
    const { data } = (useContext(Question_type_context))
    const { question_text, is_require, id, index, rate } = data
    
    const delete_item = () => {
        dispatch({ type: "DELETE_ITEM", payload: id })
    }
    const edit_item = () => {
        dispatch({ type: "UPDATE_ITEM_BEGIN",payload: data })
    }
    return (<>
        <div className={"update-render-item"} style={{ paddingBottom: "40px" }} >

            <span style={{ float: "right", display: "inline", marginRight: "8px", marginTop: "8px" }} >
            <Button type="dashed" onClick={edit_item} >修改</Button>
                <Button type="danger" onClick={delete_item}>删除</Button>
                </span>
            <div className={"update-render-head"}>
            <span style={{ color: "red" }}>{is_require ? "*" : ""}</span>
            {index + 1}.
             <span >{question_text}</span>
             </div>
            <Rate count={rate} className="rate_update" onChange={(e) => { console.log(e) }}></Rate>
        </div>
    </>)
}
