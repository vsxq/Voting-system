import { Context, } from "../../redux/survey_update_redux"
import { useContext, useState, createContext } from 'react'
import { Question_type_context } from "../survey_update_list_render_app"
import { Radio, Button } from 'antd';
import * as React from 'react';


const RadioGroup = Radio.Group;
export const Render_radio = () => {
    const { state, dispatch } = useContext(Context);
    const { data } = (useContext(Question_type_context))
    const { question_text, is_require, answers, id, index } = data




    const delete_item = () => {
        dispatch({ type: "DELETE_ITEM", payload: id })
    }
    const edit_item = () => {
        dispatch({ type: "UPDATE_ITEM_BEGIN", payload: data })

    }
    return (<>
        <div className={"update-render-item"} style={{ paddingBottom: "40px" }} >

            <span style={{ float: "right", display: "inline", marginRight: "8px", marginTop: "8px" }} >
                <Button type="dashed" onClick={edit_item} >修改</Button>
                <Button type="danger" onClick={delete_item}>删除</Button></span>

            <div className={"update-render-head"}>
                <span style={{ color: "red" }}>{is_require ? "*" : ""}</span>
                {index + 1}.
            <span >{question_text}</span>
            </div>
            <RadioGroup >
                {answers.map((value) => (

                    <Radio value={value.id} key={value.id} className={"update-render-radio"}>
                        {(Object.keys(value.picture).length !== 0) ? (<>
                            <img className={"update_picture"} src={value.picture[0].url}>
                            </img>
                            <div className={"check_pictire_text update-render-radio"}>{value.text}</div>
                        </>) : (<div style={{ fontSize: "18px", marginLeft: "8px", display: "inline-block" }}>
                            {value.text}
                        </div>)
                        }


                    </Radio>


                ))}  </RadioGroup>
        </div>
    </>)
}