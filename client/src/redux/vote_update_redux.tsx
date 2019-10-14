import { createContext } from "react"
export const Context = createContext(null)

export const initValue: any = {
    vote_id: "",
    vote_name: "",
    vote_img:[],
    player_container: [],




}//初始值
type Action =
    //增加选手
    |{ type: "ADD", payload: {} }
    | { type: "EDIT", payload: { player_id, player_img, player_name } }
    | { type: "DELETE", payload: string }
    | { type: "INITIAL", payload: { player_container, vote_img, vote_name } }

export function reducer(state, action: Action) {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                ...{
                    player_container:
                        action.payload
                }
            }
        case "EDIT":
            
            return {
                ...state,
                ...{
                    player_container:
                        
                            action.payload
                        }
                
            }
        case "DELETE":
            return {
                ...state,
                ...{
                    player_container:
                        
                            action.payload
                        }
                
            }


        case "INITIAL":
            return {
                ...state, ...{ player_container: action.payload.player_container },
                ...{ vote_img: action.payload.vote_img },
                ...{ vote_name: action.payload.vote_name },

            }
        default: throw new Error("redux错误");


    }
}