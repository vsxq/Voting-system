import { Context, } from "../redux/survey_preview_show_render"
import { useContext, createContext } from 'react'
import { type_quesition } from "../utils/enum"
import * as React from 'react';
import { Render_radio } from "./survey_show/render_radio"
import { Render_rate } from "./survey_show/render_rate"
import { Render_checked } from "./survey_show/render_checkbox"
import { Render_text } from "./survey_show/render_text"
import { Button, message } from "antd"
import { ajax_post } from "../utils/ajax";
import { url_api } from "../utils/url"
import { status_enum } from "../utils/enum"
import { redirect } from "../utils/base_utils";


export const Question_type_context = createContext(null)
const Question_type_context_provider = props => {

    return (
        <Question_type_context.Provider value={{ data: props.data }}>
            {props.children}
        </Question_type_context.Provider>
    )
}

export const Render_list_item = ({ ...props }) => {

    const { state, dispatch } = useContext(Context);
    const { data } = (useContext(Question_type_context))
    const question_type = Number(data.question_type)



    switch (question_type) {
        case type_quesition.radio: return <Render_radio></Render_radio>
        case type_quesition.text: return <Render_text></Render_text>
        case type_quesition.checkbox: return <Render_checked></Render_checked>
        case type_quesition.rate: return <Render_rate></Render_rate>
        default: console.log(Number(state.new_question_type)); throw new Error("未知类型");
    }


}

export const Submit_data_record = ({ ...props }) => {

    const { state, dispatch } = useContext(Context);
    const check_data = () => {
        const { question_container, survey_data, survey_id } = state
        let is_require_question = 0
        let is_require_answer = 0
        question_container.map((value) => {
            if (value.is_require) is_require_question = is_require_question + 1
        })
        Object.keys(survey_data).map((value) => {
            if (survey_data[value].is_require) is_require_answer = is_require_answer + 1
        })
        let extra_chekbox = []
        if (is_require_question === is_require_answer && is_require_answer !== 0) {
            let survey_data_value = Object.values(survey_data).map((value: any) => {
                if (value.is_require !== undefined) {
                    delete value.is_require;

                }
                if (value.is_checkbox !== undefined) {
                    value.answer_value.map((_value) => {
                        extra_chekbox.push({
                            answer_value: _value,
                            question_id: value.question_id

                        })
                    })
                    return {}
                }
                else { 
                    return value }

            }
            )

            survey_data_value= survey_data_value.concat(extra_chekbox)
            const will_submit_data = { survey_data: survey_data_value, survey_id }
            console.log(will_submit_data)


            const submit_data = async () => {
                const data = await ajax_post(url_api.survey_record_submit, will_submit_data)
                switch (Number(data.status)) {

                    case status_enum.success_info:

                        dispatch({ type: "SUBMIT" })
                        
                        message.success("提交成功,感谢你的提交");
                        if((localStorage.getItem("level") === "profession")){
                            message.success("尊敬的会员，广告被你清楚掉了，你好棒")
                        }
                        else{
                            message.warning("我是广告，我是广告，我是广告")
                            message.warning("只有充钱才会看不见我")
                        }
                        


                        break;
                    case status_enum.error:
                            //变黑
                            dispatch({ type: "SUBMIT" })
                        message.error("你之前已经提交过了，不要反复提交");break;
                    default: message.error("服务器异常,提交失败")

                }
            }
            submit_data()



        }
        else {
            message.error("请检查输入项")
        }





    }
    return (
        <Button className="show_survet_button" type="primary" onClick={check_data} disabled={state.is_submit}>提交</Button>
    )
}
export const Submit_data_preview = ({ ...props }) => {
    const { state } = useContext(Context);
    const check_data = () => {
        const { question_container, survey_data } = state
        let is_require_question = 0
        let is_require_answer = 0
        question_container.map((value) => {
            if (value.is_require) is_require_question = is_require_question + 1
        })
        Object.keys(survey_data).map((value) => {
            if (survey_data[value].is_require) is_require_answer = is_require_answer + 1
        })

        if (is_require_question === is_require_answer && is_require_answer !== 0) {
            message.success("测试提交成功，满意的话就去发布吧")

        }
        else {
            message.error("请检查输入项")
        }




        console.log(state)
    }
    return (
        <Button className="show_survet_button" type="primary" onClick={check_data}>提交</Button>
    )
}

export const Render_lists = () => {
    const { state } = useContext(Context);

    return (<div className={"render_preview"}>


        {
            state.question_container.map((value, index) => (
                <Question_type_context_provider key={value.id} data={{ ...value, index }} index={index}>
                    <Render_list_item key={value.id} data={value}></Render_list_item>

                </Question_type_context_provider>

            ))
        }


    </div >)
}