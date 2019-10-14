import { Context, } from "../../redux/survey_preview_show_render"
import { useContext, useState, createContext } from 'react'
import { Question_type_context } from "../survey_show_app"
import { Radio, Button, Form, Input } from 'antd';
import * as React from 'react';
import { input_check_enum } from "../../utils/enum"
import { input_check_email, input_check_float, input_check_int, input_check_tel } from "../../utils/input_check"
export const Render_text = () => {


    const { state, dispatch } = useContext(Context);
    const [get_input_value, set_input_value] = useState("")
    const { data } = (useContext(Question_type_context))
    const { question_text, is_require, picture, id, index, check } = data
    let return_data = {
        validateStatus: 'success',
        errorMsg: null,
    }
    const [info, setInfo] = useState(return_data)



    return (<>
        <div className={"update-render-item"} style={{ paddingBottom: "40px" }} >


            <div className={"update-render-head"}>
                <span style={{ color: "red" }}>{is_require ? "*" : ""}</span>
                {index + 1}. <span >
                    {question_text}
                </span>
            </div>
            {(picture.length !== 0) ? (<img className={"update_picture"} src={picture[0].url}></img>) :
                (<></>)}

            <Form className="login-form">
                <Form.Item
                    validateStatus={info.validateStatus}
                    help={info.errorMsg}

                >

                    <Input value={get_input_value} style={{ marginTop: "20px" }} onChange={(e) => {
                        const value = e.target.value
                        set_input_value(value)

                        switch (check) {
                            case input_check_enum.null: break;
                            case input_check_enum.tel: return_data = (input_check_tel(value)); break;
                            case input_check_enum.email: return_data = (input_check_email(value)); break;
                            case input_check_enum.int: return_data = (input_check_int(value)); break;
                            case input_check_enum.float: return_data = (input_check_float(value)); break;
                            default: throw new Error("未知的错误类型")
                        }
                        setInfo(return_data)
                        if (value !== "" && return_data.validateStatus === "success")

                            dispatch({
                                type: "EDIT", payload: {
                                    id: id, value: {
                                        question_id: id,
                                        answer_value: value,
                                        is_require,
                                        is_text:true
                                    }
                                }
                            })
                        else {
                            if (state.survey_data[id] !== undefined)
                                dispatch({ type: "DELETE", payload: id })
                        }


                    }} />
                </Form.Item></Form>
        </div>

    </>)
}