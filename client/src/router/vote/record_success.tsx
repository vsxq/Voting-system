import * as React from "react"
import { dynamicCss, dynamicJs } from "../../utils/base_utils"
import { useEffect, useState } from "react"
export const Record_success = ({ ...props }) => {
  const [is_ready, setIs_ready] = useState(false)
  const vote_name = props.match.params.id
  useEffect(() => {
    dynamicCss("/css/weui.css")
    setIs_ready(true)
  }, [])
  return (<>
    {is_ready ? (<>
      <div className="weui-msg">
        <div className="weui-msg__icon-area"><i className="weui-icon-success weui-icon_msg" /></div>
        <div className="weui-msg__text-area">
          <h2 className="weui-msg__title">操作成功</h2>
          <p className="weui-msg__desc">你成功为{vote_name}投上你宝贵的一票</p>
        </div>
        <div className="weui-msg__opr-area">
          <p className="weui-btn-area">
            <a href="/" className="weui-btn weui-btn_primary">我也要发起投票</a>
            <a href="javascript:history.back();" className="weui-btn weui-btn_default">返回上一页</a>
          </p>
        </div>
        <div className="weui-msg__extra-area">
          <div className="weui-footer">
            <p className="weui-footer__links">
              <a href="javascript:void(0);" className="weui-footer__link">底部链接文本</a>
            </p>
            <p className="weui-footer__text">Copyright © 2018-2019 大同科技</p>
          </div>
        </div>
      </div>
    </>) : (<></>)}


  </>)
}
