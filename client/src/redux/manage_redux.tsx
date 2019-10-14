import { createContext } from "react"
export const Context = createContext(null)
export const initValue: any = []//初始值
type Action =
    | { type: "INITIAL", payload: object[] }
    | { type: "DELETE", payload: string }
export function reducer(state, action: Action) {
    switch (action.type) {
        case "INITIAL": return state.concat(action.payload)
        case "DELETE": return state.filter((value) => { 
            if(value.type==="survey"){
            return value.survey_id !== action.payload }
            else{
                return value.vote_id !== action.payload   
            }}
            )

        default: throw new Error("redux错误");
    }
}