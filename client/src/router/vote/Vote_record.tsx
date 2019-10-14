import { url_api } from "../../utils/url" //重定向的url
import { ajax_post } from "../../utils/ajax"//ajax方法
import * as React from 'react';
import { url_redirect } from "../../utils/url_redirect"

import { dynamicCss, dynamicJs, redirect } from "../../utils/base_utils"
import { status_enum } from "../../utils/enum"
import { useEffect, useState } from "react"
import { message } from "antd"
export const Vote_record_item = ({ ...props }) => {
    const value = props.value
    const index = props.index
    const [showdialog, setShowdialog] = useState("none")
    const submit_data = async () => {
        const will_submit_data = { vote_id: props.vote_id, player_id: value.player_id }
        const data = await ajax_post(url_api.vote_record_submit, will_submit_data)
        switch (Number(data.status)) {
            case status_enum.success_info:


                redirect(url_redirect.vote_record_success + value.player_name);
                break
            case status_enum.error: redirect(url_redirect.vote_record_fail);break;
            default: message.error("未知错误")
        }
    }
    return (<>
        <div key={value.player_id}>
            <div style={{ display: showdialog }}>
                <div className="weui-mask" />
                <div className="weui-dialog">
                    <div className="weui-dialog__hd"><strong className="weui-dialog__title">再次确认</strong></div>
                    <div className="weui-dialog__bd">
                        <p>您确定要投 “{value.player_name}” 吗?</p>
                        <p>请注意，您每天只可以投一次</p>
                    </div>
                    <div className="weui-dialog__ft">
                        <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={() => { setShowdialog("none") }}>我再看看</a>
                        <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={() => { setShowdialog("none"); submit_data() }}>就要投他</a>
                    </div>
                </div>
            </div>
            <div className="grid-item item" style={{ position: 'absolute', left: index % 2 ? 0 : 156 + "px", top: Math.floor(index / 2) * 262 + 'px' }} key={value.player_id}>
                <img className="item-img" src={value.player_img[0].url} style={{height: "160px"}} />
                <div className="lfy_name_xuanshou font12">{value.player_name}</div>
                <div className="lfy_piaoshu font12">{value.count-1}票</div>
                <div className="lfy_toupiao_btn">
                    {/* <img src="img/btn_02.png"> */}
                    <p className="lfy_toupian font14" onClick={() => {
                        setShowdialog("block")

                    }}>投票</p>
                </div>

            </div>
        </div>
    </>)
}
export const Vote_record = ({ ...props }) => {
    const vote_id = props.match.params.id
    const [is_ready, set_Isready] = useState(false)
    const [has_auth, setHas_auth] = useState(false)
    const [data_cache, setData_cache] = useState({ vote_id: "", player_container: [], vote_name: "", vote_img: [], page_view: 0, vote_count: [], sum: 0 })
    useEffect(() => {
        //加载外部文件
        dynamicCss("/css/find.css")
        dynamicCss("/css/phone.css")
        dynamicCss("/css/reset.css")
        dynamicCss("/css/style1.css")
        dynamicCss("/css/swiper.css")
        dynamicCss("/css/weui.css")
        dynamicJs("/js/jquery.js")
        dynamicJs("/js/ASmin.js")
        dynamicJs("/js/111.js")
        dynamicJs("/js/imagesloaded.pkgd.min.js")

        dynamicJs("/js/jweixin-1.2.0.js")
        dynamicJs("/js/masonry.pkgd.min.js")
        dynamicJs("/js/swiper.jquery.js")

        //请求数据
        const authority = async () => {
            const data = await ajax_post(url_api.vote_record, { vote_id })
            if (Number(data.status) === status_enum.success_info) {
                const { page_view, vote_count } = data
                const { vote_id, vote_img, vote_name,player_container  } = data.data
                const q=player_container.map((value) => {

                    const find_data=vote_count.find((va) => { if (Object.keys(va)[0] === value.player_id) return true })
                    return {...value,count:Number(Object.values(find_data)[0])}
                })
                
                
                let sum = 0
                vote_count.map((value) => {
                    sum = sum + Number(Object.values(value)[0])-1

                })
                
                console.log(data)
                setData_cache({ vote_id, vote_img, vote_name, player_container:q, page_view, vote_count, sum })

                setHas_auth(true)






            }
            else if (Number(data.status) === status_enum.illegal_survey) {
                setHas_auth(false)
                message.error("人气投票不存在")
                message.error("2s后将返回上一网页")
                setTimeout(() => {
                    window.history.go(-1)
                }, 2000);
            }
            else {
                message.error("服务器异常")
            }

        }
        authority()

    }, [])
    

    return (<>{has_auth ? (
        <>

            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img src={data_cache.vote_img[0].url} />
                    </div>

                </div>
                <div className="swiper-pagination" />
            </div>
            <div className="lfy_icon_btn clearfix">
                <div className="lfy_every_bnt">

                    <p className="lfy_icon_txt font14 hp_number_color">{data_cache.player_container.length}</p>
                    <p className="lfy_icon_txt font14 juli">已报名</p>
                </div>
                <div className="lfy_every_bnt">

                    <p className="lfy_icon_txt font14 hp_number_color">{data_cache.sum}</p>
                    <p className="lfy_icon_txt font14 juli">总投票</p>
                </div>
                <div className="lfy_every_bnt">

                    <p className="lfy_icon_txt font14 hp_number_color">{data_cache.page_view}</p>
                    <p className="lfy_icon_txt font14 juli">浏览量</p>
                </div>
            </div>



            <div className="lfy_touxiang_div" style={{ marginBottom: '20%' }}>

                <div className="lfy_xuanshou clearfix">
                    <div className="container">
                        <aside className="fall-box grid" style={{ position: 'relative', height: '787.08px' }}>
                            {data_cache.player_container.map((value: any, index: number) => (
                                (
                                    <Vote_record_item value={value} vote_id={vote_id} index={index} key={value.player_id}></Vote_record_item>

                                )
                            ))}

                        </aside>
                        <a href="javascript:;" className="more-a"></a>
                    </div>
                </div>
            </div>
           
        </>
    ) : (<></>)}</>
    )
}
