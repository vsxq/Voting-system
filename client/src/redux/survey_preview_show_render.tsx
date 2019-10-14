import { createContext } from "react"
export const Context = createContext(null)

export const initValue: any = {
    survey_id: "",
    survey_name: "",
    question_container: [],//survey的数据
    survey_data: {},
    is_submit:false,//只允许提交一次

}//初始值
type Action =
    | { type: "INITIAL", payload: { survey_name, survey_id, question_container } }
    | { type: "EDIT", payload: { id, value } }
    | { type: "DELETE", payload: string }
    | {type:"SUBMIT",payload}
export function reducer(state, action: Action) {
    switch (action.type) {
        case "INITIAL":
            return {
                ...state, ...{ survey_id: action.payload.survey_id },
                ...{ survey_name: action.payload.survey_name },
                ...{ question_container: action.payload.question_container },

            }
        case "EDIT":
            return {
                ...state,
                ...{
                    survey_data: {
                        ...state.survey_data,
                        ...{ [action.payload.id]: action.payload.value }
                    }
                }
            }
        case "DELETE":
        delete state.survey_data[action.payload];
            return state
        case "SUBMIT":
            return {...state,...{is_submit:true}}



        default: throw new Error("redux错误");


    }
}