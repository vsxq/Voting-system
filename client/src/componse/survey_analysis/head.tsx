import * as React from 'react';
export const Head=({...props})=>{
    return (<div className="analysis_head" style={{marginBottom:"30px"}}>
        问卷名称：{props.survey_name}
    </div>)
}