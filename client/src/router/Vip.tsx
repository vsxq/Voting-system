
import * as React from 'react';
export const Vip = () => {
   
    return(
      <>
      {    (localStorage.getItem("level") === "profession")?(<>
                <h1>会员标识：您是尊贵的专业用户</h1>
                
      </>):(<h1>很抱歉，这个账号不是会员</h1>)}
      </>
    )
    }
