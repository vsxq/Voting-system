import { createContext } from "react"
import { get_id } from "../utils/base_utils"
import { message } from 'antd';
export const Context_answer = createContext(null)

export const initValue: any = [{ text: "", id: get_id(),picture:[] }, { text: "", id: get_id(),picture:[] }]//初始值
type Action =

    |{ type: "ADD_EMPYT_CHOICE", }
    | { type: "CHANGE_TEXT", payload: { id: string, text: string } }
    | { type: "ADD_DOWN", payload: string }
    | { type: "DELETE", payload: string }
    | { type: "MOVE_DOWN", payload: string }
    | { type: "PICTURE", payload: { id: string, picture: any } }
    |{type:"INIT",payload:any}
export function reducer(state, action: Action) {
    switch (action.type) {
        case "INIT":
            return [...action.payload]
        case "ADD_EMPYT_CHOICE":
            return [...state, { id: get_id(), text: "", picture:[]}]
        case "PICTURE":
            return state.map((value) => {
                if (value.id === action.payload.id) {
                    console.log(action.payload.picture)
                    return { ...value, picture: action.payload.picture }
                }
                else {
                    return value
                }
            })
        case "CHANGE_TEXT":
            return state.map((value) => {
                if (value.id === action.payload.id) {
                    console.log(action.payload.text)
                    return { ...value, text: action.payload.text }
                }
                else {
                    return value
                }
            })
        case "ADD_DOWN":
            return state.map((value) => {
                if (value.id === action.payload) {
                    return [value, { id: get_id(), text: "",picture:[] }]
                }
                else {
                    return value
                }
            }).flat()
        case "DELETE":
            if (state.length >= 3) {
                return state.filter(value => value.id !== action.payload)
            }
            else {

                return state
            }
        default: throw new Error("redux错误");


    }
}