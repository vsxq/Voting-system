import { useState, useEffect } from "react"
import { Modal } from "antd";
import { url_redirect } from "./url_redirect";

export function object_not_null(o: object): boolean {
  if (o === undefined) {
    return false
  }
  const arr = Object.keys(o);
  if (arr.length !== 0) {
    return true
  }
  else {
    return false
  }
}

export function useInputValue(initialValue) {
  let [value, setValue] = useState(initialValue);
  let onChange = function (event) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange,
    setValue

  };
}
export function dynamicJs(href) {
  //导入外部js,牺牲性能换来牛皮癣

  let script = document.createElement('script');
  script.src = href;

  document.body.appendChild(script);

}
export function dynamicCss(href) {

  let head = document.head
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = href;
  head.appendChild(link);

}
let id_set = new Set()
export const add_id=(other_id):void=>{
  id_set.add(other_id)
}
export const show_id=()=>{
  return id_set
}
export const get_id = (): string => {

  const id = Math.random().toString(32).slice(2)+Date.now().toString(32)
  if (!id_set.has(id)) {
    //检查是否重复,不过一般概率小的可怜
    id_set.add(id_set)
    
    return id
  }
  else {
    get_id()
  }

}
export const redirect = (url) => {
  window.location.href = url
}
export const toast_error = (toast_info, toast_content?) => {
  Modal.error({
    title: toast_info,
    content: toast_content
  });
}
export const goto_login = () => {
  toast_error("登录信息丢失", "6s后将跳转到登录页面")
  setTimeout(() => { redirect(url_redirect.login) }, 6000)


}

