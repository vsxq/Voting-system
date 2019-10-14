import { createContext } from "react"
import { message } from "antd";
export const Context = createContext(null)

export const initValue: any = {
    new_question_type: 0,
    question_array: [],
    editing_status: false,
    will_editing_data: {},
    data: {},
    vip_status: false,
    id: "",
    survey_name: "",
    id_set: new Set()

}//初始值
type Action =

    |{ type: "ADD", payload: [] }
    | { type: "CHANGE_TYPE", payload: {} }
    | { type: "DELETE_ITEM", payload: string }
    | { type: "UPDATE_TYPE", payload: {} }
    | { type: "UPDATE_ITEM_BEGIN", payload: {} }
    | { type: "UPDATE_ITEM_END", payload: any }
    | { type: "UPDATE_ITEM_TYPE", payload: {} }
    | { type: "CANCEL_UPDATE" }
    | { type: "INITIAL", payload: { survey_name, survey_id, question_container } }

export function reducer(state, action: Action) {
    switch (action.type) {


        case "ADD":
            if (state.question_array.length >= 5 && (localStorage.getItem("level") !== "profession")) {
                message.error("对不起，您不是专业版，最多就有五个问题")
                return { ...state }
            }
            else {


                return { ...state, ...{ question_array: state.question_array.concat(action.payload) } }
            }
        case "CHANGE_TYPE":
            return { ...state, ...action.payload }

        case "DELETE_ITEM":
            return {
                ...state, ...{
                    question_array: state.question_array.filter((value) => {
                        if (value.id !== action.payload) {
                            return true
                        }
                    })
                }
            }

        case "UPDATE_ITEM_BEGIN":

            return { ...state, ...{ editing_status: true }, ...{ will_editing_data: action.payload } }
        case "UPDATE_ITEM_END":

            return {
                ...state, ...{
                    question_array: state.question_array.map((question_object) => {
                        if (question_object.id === action.payload.id) {
                            return action.payload
                        } else { return question_object }
                    })
                }, ...{ editing_status: false }
            }
        case "CANCEL_UPDATE":
            return { ...state, ...{ editing_status: false }, ...{ will_editing_data: {} } }
        case "INITIAL":
            return {
                ...state, ...{ id: action.payload.survey_id },
                ...{ survey_name: action.payload.survey_name },
                ...{ question_array: action.payload.question_container }
            }
        default: throw new Error("redux错误");


    }
}