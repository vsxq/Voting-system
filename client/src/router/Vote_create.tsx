
import * as React from 'react';
import { dynamicCss, dynamicJs } from "../utils/base_utils"
import { useEffect, useState } from "react"
export const Vote_create = () => {
    const [is_ready, set_Isready] = useState(false)

    useEffect(() => {
        dynamicCss("/css/find.css")
        dynamicCss("/css/phone.css")
        dynamicCss("/css/reset.css")
        dynamicCss("/css/style1.css")
        dynamicCss("/css/swiper.css")
        dynamicJs("/js/jquery.js")
        dynamicJs("/js/ASmin.js")
        dynamicJs("/js/111.js")
        dynamicJs("/js/imagesloaded.pkgd.min.js")

        dynamicJs("/js/jweixin-1.2.0.js")
        dynamicJs("/js/masonry.pkgd.min.js")
        dynamicJs("/js/swiper.jquery.js")

    }, [])

    return (<>
        <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <img src="https://www.qmwtp.com/uploads/project/20190602/206973427315594823451483899920/155948234567796.jpg" />
                </div>

            </div>
            <div className="swiper-pagination" />
        </div>
        <div className="lfy_icon_btn clearfix">
            <div className="lfy_every_bnt">
               
                <p className="lfy_icon_txt font14 hp_number_color">0</p>
                <p className="lfy_icon_txt font14 juli">已报名</p>
            </div>
            <div className="lfy_every_bnt">
               
                <p className="lfy_icon_txt font14 hp_number_color">0</p>
                <p className="lfy_icon_txt font14 juli">总投票</p>
            </div>
            <div className="lfy_every_bnt">
                
                <p className="lfy_icon_txt font14 hp_number_color">0</p>
                <p className="lfy_icon_txt font14 juli">浏览量</p>
            </div>
        </div>
       


        <div className="lfy_touxiang_div" style={{ marginBottom: '20%' }}>
            
            <div className="lfy_xuanshou clearfix">
                <div className="container">
                    <aside className="fall-box grid" style={{ position: 'relative', height: '787.08px' }}>
                        <div className="grid-item item" style={{ position: 'absolute', left: '0px', top: '0px' }}>
                            <img className="item-img" src="https://www.qmwtp.com/application/PC/views/ActivityPc2/img/bg_player.png" />
                            <div className="lfy_name_xuanshou font12">1号选手</div>
                            <div className="lfy_piaoshu font12">0票</div>
                            <div className="lfy_toupiao_btn">
                                {/* <img src="img/btn_02.png"> */}
                                <p className="lfy_toupian font14">投票</p>
                            </div>
                            <p className="lfy_number font14">编号:1</p>
                        </div>{/*item end*/}
                        <div className="grid-item item" style={{ position: 'absolute', left: '156px', top: '0px' }}>
                            <img className="item-img" src="https://www.qmwtp.com/application/PC/views/ActivityPc2/img/bg_player.png" />
                            <div className="lfy_name_xuanshou font12">2号选手</div>
                            <div className="lfy_piaoshu font12">0票</div>
                            <div className="lfy_toupiao_btn">
                                {/* <img src="img/btn_02.png"> */}
                                <p className="lfy_toupian font14">投票</p>
                            </div>
                            <p className="lfy_number font14">编号:2</p>
                        </div>{/*item end*/}
                        <div className="grid-item item" style={{ position: 'absolute', left: '0px', top: '262px' }}>
                            <img className="item-img" src="https://www.qmwtp.com/application/PC/views/ActivityPc2/img/bg_player.png" />
                            <div className="lfy_name_xuanshou font12">3号选手</div>
                            <div className="lfy_piaoshu font12">0票</div>
                            <div className="lfy_toupiao_btn">
                                {/* <img src="img/btn_02.png"> */}
                                <p className="lfy_toupian font14">投票</p>
                            </div>
                            <p className="lfy_number font14">编号:3</p>
                        </div>{/*item end*/}
                        <div className="grid-item item" style={{ position: 'absolute', left: '156px', top: '262px' }}>
                            <img className="item-img" src="https://www.qmwtp.com/application/PC/views/ActivityPc2/img/bg_player.png" />
                            <div className="lfy_name_xuanshou font12">4号选手</div>
                            <div className="lfy_piaoshu font12">0票</div>
                            <div className="lfy_toupiao_btn">
                                {/* <img src="img/btn_02.png"> */}
                                <p className="lfy_toupian font14">投票</p>
                            </div>
                            <p className="lfy_number font14">编号:4</p>
                        </div>{/*item end*/}
                        <div className="grid-item item" style={{ position: 'absolute', left: '0px', top: '524px' }}>
                            <img className="item-img" src="https://www.qmwtp.com/application/PC/views/ActivityPc2/img/bg_player.png" />
                            <div className="lfy_name_xuanshou font12">5号选手</div>
                            <div className="lfy_piaoshu font12">0票</div>
                            <div className="lfy_toupiao_btn">
                                {/* <img src="img/btn_02.png"> */}
                                <p className="lfy_toupian font14">投票</p>
                            </div>
                            <p className="lfy_number font14">编号:5</p>
                        </div>{/*item end*/}
                        <div className="grid-item item" style={{ position: 'absolute', left: '156px', top: '524px' }}>
                            <img className="item-img" src="https://www.qmwtp.com/application/PC/views/ActivityPc2/img/bg_player.png" />
                            <div className="lfy_name_xuanshou font12">6号选手</div>
                            <div className="lfy_piaoshu font12">0票</div>
                            <div className="lfy_toupiao_btn">
                                {/* <img src="img/btn_02.png"> */}
                                <p className="lfy_toupian font14">投票</p>
                            </div>
                            <p className="lfy_number font14">编号:6</p>
                        </div>{/*item end*/}
                    </aside>
                    <a href="javascript:;" className="more-a"></a>
                </div>
            </div>
        </div>
        <div className="lfy_foot_btn" style={{ height: '50px' }}>
            <div className="lfy_foot_icon" style={{ width: '50%' }}>
                <div className="lfy_foot_img1">
                </div>
                <p className="lfy_foot_txt1 font12">首页</p>
            </div>
            <div className="lfy_foot_icon" style={{ width: '50%', cursor: 'pointer' }} >
                <div className="lfy_foot_img2">
                </div>
                <p className="lfy_foot_txt font12">排行榜</p>
            </div>
        </div>
    </>
    )
}
