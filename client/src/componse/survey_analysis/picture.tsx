import echarts from 'echarts'
import * as React from 'react';
import { Button, message } from 'antd';

export function Picture({ ...props }) {
    const data_source = props.data

    const index = props.index
    const category = () => {

        echarts.init(document.querySelector('#main' + index)).setOption({

            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: data_source.map((value: any) => { return value.option }),
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: data_source.map((value: any) => { return { name: value.option, value: value.sum } }),
                }
            ]
        }, true)
    }
    const pie = () => {
        ;

        echarts.init(document.querySelector('#main' + index)).setOption({

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: data_source.map((value: any) => { return value.option })
            },
            series: [
                {
                    name: '分析',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:
                        data_source.map((value: any) => { return { name: value.option, value: value.sum } }),

                }
            ]


        }, true)

    }


    return (

        <>{localStorage.getItem("level") === "profession" ? (<>
            <div className="button-list">


                <Button type="dashed" className="analysis-button" onClick={() => { pie() }}>圆环</Button>
                <Button type="dashed" className="analysis-button" onClick={() => { category() }}>条形</Button>

            </div>
            <div id={"main" + index} style={{ width: 600, height: "350%" }}></div>
        </>) : (<>
            <div className="button-list">


                <Button type="dashed" className="analysis-button" onClick={() => { message.warning("对不起，你不是会员，数据分析只有表格") }}>圆环</Button>
                <Button type="dashed" className="analysis-button" onClick={() => { message.warning("对不起，你不是会员，数据分析只有表格") }}>条形</Button>

            </div>
        </>)}
        </>
    )
}