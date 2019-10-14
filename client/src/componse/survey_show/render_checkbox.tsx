import { Context, } from "../../redux/survey_preview_show_render"
import { useContext, useState, createContext } from 'react'
import { Question_type_context } from "../survey_show_app"
import { Button, Form, Input, Checkbox } from 'antd';
import * as React from 'react';
export const Render_checked = () => {
    const check_number = (input_array: string[]) => {
        if (input_array.length <= max_number && input_array.length >= min_number) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
        return {
            validateStatus: 'error',
            errorMsg: `请选择至少${min_number}项，至多${max_number}项`,
        }
    }
    const CheckboxGroup = Checkbox.Group;
    const { state, dispatch } = useContext(Context);
    const { data } = (useContext(Question_type_context))
    const { question_text, is_require, answers, id, index, min_number, max_number } = data
    let return_data = {
        validateStatus: 'success',
        errorMsg: null,
    }
    const [info, setInfo] = useState(return_data)



    return (<><div className={"update-render-item"} style={{ paddingBottom: "40px" }} >


        <div className={"update-render-head"}>
            <span style={{ color: "red" }}>{is_require ? "*" : ""}</span>
            {index + 1}. <span >{question_text}</span>
        </div>
        <Form className="login-form">
            <Form.Item
                validateStatus={info.validateStatus}
                help={info.errorMsg}

            >

                <CheckboxGroup onChange={(e: any) => {
                    return_data = (check_number(e))
                    if (return_data.validateStatus === "success" && e.length !== 0) {

                        dispatch({
                            type: "EDIT", payload: {
                                id: id, value: {question_id:id,
                                    answer_value: e, 
                                     is_require,
                                     is_checkbox:false
                                }
                            }
                        })
                    }
                    else{
                        if(state.survey_data[id]!==undefined)
                        dispatch({type:"DELETE",payload:id})
                    }
                    setInfo(return_data)
                }}>

                    {answers.map((value: any) => (
                        <div key={value.id} className={"update-render-radio"}>
                            <Checkbox value={value.id} >
                                {(Object.keys(value.picture).length !== 0) ? (<>
                                    <img className={"update_picture"} src={value.picture[0].url}>
                                    </img>
                                    <div className={"check_pictire_text update-render-radio"}>{value.text}</div>
                                </>) :
                                    (<div style={{ fontSize: "18px", marginLeft: "8px", display: "inline-block" }}>{value.text}</div>)}
                            </Checkbox>

                        </div>

                    ))}

                </CheckboxGroup>
            </Form.Item>
        </Form>
    </div>

    </>)
}