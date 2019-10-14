import { Context, } from "../../redux/survey_preview_show_render"
import { useContext, useState, createContext } from 'react'
import { Question_type_context } from "../survey_show_app"
import { Radio, Button } from 'antd';
import * as React from 'react';


const RadioGroup = Radio.Group;
export const Render_radio = () => {
    const { state, dispatch } = useContext(Context);
    const { data } = (useContext(Question_type_context))
    const { question_text, is_require, answers, id, index } = data





    return (<>
        <div className={"update-render-item"} style={{ paddingBottom: "40px" }} >



            <div className={"update-render-head"}>
                <span style={{ color: "red" }}>{is_require ? "*" : ""}</span>
                {index + 1}.
            <span >{question_text}</span>
            </div>
            <RadioGroup onChange={(e) => {
                console.log(e)
                dispatch({
                    type: "EDIT", payload: {
                        id: id, value: {
                            
                            question_id:id,
                                    answer_value: e.target.value,
                           
                            is_require
                        }
                    }
                })
            }}>
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