import axios from "axios"
import { useEffect, useState } from "react"
import { goto_login } from "./base_utils"
import { status_enum } from "./enum"
import { url_api } from "./url"
const get_jwt = () => {
    return localStorage.getItem("jwt")
}
axios.interceptors.response.use((response) => {
    if (response.data.status === status_enum.error_token || response.data.status === status_enum.illegal_token || response.data.status === status_enum.token_drop) {
        goto_login()

        return response
    }
    return response
})
//ajax_get方法
//get方法默认不用携带jwt,比如login与upload picture的时候
export async function ajax_get(url: string, params?: object) {

    try {
        const jwt = get_jwt()
        if (jwt !== null) {
            params = { ...params, jwt }
        }
        let response = await axios.get(url, { params })

        const status = response.status

        if (status === 200) {
            return response.data
        }
        else {
            console.log("http false", status)
            return
        }
    } catch (error) {
        console.error(error)
        return false
    }
}


//ajax_post方法
//post 请求必须携带jwt,否则返回登录页面
export async function ajax_post(url: string, params?: object) {
    //特例，提交survey的时候
    try {
        if (url !== url_api.survey_record_submit) {
                //如果还有4个小时过期的话
          if(Date.now()-Number(localStorage.getItem("login_time"))>1000*60*60*6){
                   const response =await axios.post(url_api.refresh_token)
                    const data=response.data.token
                    localStorage.setItem("jwt",data)
          }
            const jwt = get_jwt()
            if (jwt === null) {
                goto_login()
                return
            }
            params = { ...params, jwt }
        }

        const response = await axios.post(url, params)
        const data = await response.data
        const status = await response.status

        if (status === 200) {
            return data
        }
        else {
            console.log("http false", status)
        }
    } catch (error) {
        console.error(error)
        return false
    }
}
export async function ajax_mount_get(url: string, params?: object, initila?: any, ) {
    if (initila === undefined) {
        initila = {}
    }
    const [data, setData] = useState(initila)
    useEffect(() => {
        //组件mount 发起ajax
        const get_data = async () => {
            setData(await ajax_get(url, params))


        }
        get_data()
    }, [])
    return {
        data
    }
}