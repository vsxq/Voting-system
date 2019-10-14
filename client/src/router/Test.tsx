import * as React from 'react';
import { useState,useEffect } from "react"
import moment from 'moment';
import { Button, Form, Icon, Input, Checkbox, Row, Rate ,DatePicker,Modal} from 'antd';

import echarts from 'echarts'
export const Test = () => {
  const [publish,setPublish]=useState(false)
  const[q,sQ]=useState(false)
  function disabledDate(current) {
    // Can not select days before today and today
    return   current <= moment().startOf('day');
  }
  const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
  return (<>
  <RangePicker disabledDate={disabledDate} onChange={(e)=>{
    console.log(new Date())
    console.log(e)
console.log(new Date() < e[1].toDate())
console.log(new Date()>e[0].toDate())

  }}></RangePicker>
  <Modal
            title=""
            visible={publish}
            onOk={() => {  setPublish(false) }}
            onCancel={() => { setPublish(false) }}
        >
            <p>发布后就无法修改问卷了，您确定发布吗？</p>
            <Button onClick={()=>{sQ(true)}}>显示</Button>

        </Modal>
        <Modal
            title=""
            visible={q}
            onOk={() => {  sQ(false) }}
            onCancel={() => { sQ(false) }}
        >
            <p>您吗？</p>

        </Modal>
  <Button onClick={()=>{setPublish(true)}}>显示</Button>
  </>)
}





