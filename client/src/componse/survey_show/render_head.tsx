import { Context, } from "../../redux/survey_preview_show_render"
import { useContext, useState, createContext } from 'react'
import * as React from 'react';
export const Render_head=()=>{
    const { state, dispatch } = useContext(Context);
    const head =state.survey_name
    return(<h3 className="render_head">
{head}
    </h3>)
}