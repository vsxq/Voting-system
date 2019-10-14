import { Context, } from "../../redux/survey_update_redux"
import { useContext, useState, createContext } from 'react'
import { Question_type_context } from "../survey_update_list_render_app"
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
    const [info, setInfo] = useState({
        validateStatus: 'success',
        errorMsg: null,
    })

    const delete_item = () => {
        dispatch({ type: "DELETE_ITEM", payload: id })
    }
    const edit_item = () => {
        dispatch({ type: "UPDATE_ITEM_BEGIN", payload: data })
    }

    return (<><div className={"update-render-item"} style={{ paddingBottom: "40px" }} >

        <span style={{ float: "right", display: "inline", marginRight: "8px", marginTop: "8px" }} >
            <Button type="dashed" onClick={edit_item} >修改</Button>
            <Button type="danger" onClick={delete_item}>删除</Button>
        </span>
        <div className={"update-render-head"}>
            <span style={{ color: "red" }}>{is_require ? "*" : ""}</span>
            {index + 1}. <span >{question_text}</span>
        </div>
        <Form className="login-form">
            <Form.Item
                validateStatus={info.validateStatus}
                help={info.errorMsg}

            >

                <CheckboxGroup onChange={(e: any) => { setInfo(check_number(e)) }}>

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