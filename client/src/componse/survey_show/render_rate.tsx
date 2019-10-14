import { Context, } from "../../redux/survey_preview_show_render"
import { useContext, useState, createContext } from 'react'
import { Question_type_context } from "../survey_show_app"
import { Button, Rate } from 'antd';
import * as React from 'react';

export const Render_rate = () => {
    const { state, dispatch } = useContext(Context);

    const { data } = (useContext(Question_type_context))
    const { question_text, is_require, id, index, rate } = data


    return (<>
        <div className={"update-render-item"} style={{ paddingBottom: "40px" }} >


            <div className={"update-render-head"}>
                <span style={{ color: "red" }}>{is_require ? "*" : ""}</span>
                {index + 1}.
             <span >{question_text}</span>
            </div>
            <Rate count={rate} className="rate_update" onChange={(e) => {
                dispatch({
                    type: "EDIT", payload: {
                        id: id,
                        value: {
                            is_require, question_id: id,
                            answer_value: e,
                        },

                    }
                })
            }}></Rate>
        </div>
    </>)
}
