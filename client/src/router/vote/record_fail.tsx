import * as React from "react"
import { dynamicCss, dynamicJs } from "../../utils/base_utils"
import { useEffect, useState } from "react"
export const Record_fail = ({ ...props }) => {
  const [is_ready, setIs_ready] = useState(false)
  const vote_name = props.match.params.id
  useEffect(() => {
    dynamicCss("/css/weui.css")
    setIs_ready(true)

  }, [])

  return (<>
    {
      is_ready ? (<>
        <div className="page">
          <div className="weui-msg">
            <div className="weui-msg__icon-area"><i className="weui-icon-warn weui-icon_msg" /></div>
            <div className="weui-msg__text-area">
              <h2 className="weui-msg__title">操作失败</h2>
              <p className="weui-msg__desc">你今天已经提交过这个人气投票的数据了，不要反复提交数据<a href="javascript:void(0);">不要刷票</a></p>
            </div>
            <div className="weui-msg__tips-area">
              <p className="weui-msg__tips">或者你在相同ip上使用不同账号提交，请不要这么做<a href="javascript:void(0);">从我做起</a></p>
            </div>
            <div className="weui-msg__opr-area">
              <p className="weui-btn-area">
                <a href="javascript:history.back();" className="weui-btn weui-btn_default">返回上一页</a>
              </p>
            </div>
            <div className="weui-msg__extra-area">
              <div className="weui-footer">
                <p className="weui-footer__links">
                  <a href="javascript:void(0);" className="weui-footer__link">禁止刷票</a>
                </p>
                <p className="weui-footer__text">Copyright © 2018-2019 大同科技</p>
              </div>
            </div>
          </div>
        </div>

      </>) : (<></>)
    }


  </>)
}
