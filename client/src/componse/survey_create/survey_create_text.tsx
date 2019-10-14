import { useContext, useState } from 'react'
import * as React from 'react';
import { get_id } from "../../utils/base_utils"
import { type_quesition, input_check } from "../../utils/enum"
import { Context, } from "../../redux/survey_update_redux"
import { beforeUpload } from "../../utils/picture"
import { Select, Switch, Upload, Icon, Button, message, Tooltip, Modal } from 'antd';
export const Edit_text_row = () => {
    const Option = Select.Option
    const [question_text, setQuestion_text] = useState("")
    const [is_require, setIs_require] = useState(true)
    const [text_check, setText_check] = useState(0)
    const { dispatch } = useContext(Context);

    const [model_show, setModel_show] = useState(false)
    const [fileList, setFile_picture] = useState([])

    const onChange = (info) => {
        let fileList1 = [...info.fileList];
        fileList1 = fileList1.slice(-1);
        fileList1 = fileList1.map(file => {
            if (file.response) {

                file.url = `/api/picture/show?picture_id=${file.response.file}`;
            }
            return file;
        });

        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }


        setFile_picture(fileList1)



    }


    const check = () => {

        if (question_text !== "") {
            const data = { question_text, is_require, id: get_id(), question_type: type_quesition.text, check: text_check, picture: fileList }

            dispatch({ type: "ADD", payload: data })
        }
        else {

            message.error("请检查输入")
        }
    }
    return <>
        <Modal
            title="图片"
            visible={model_show}
            cancelText={"返回"}
            okText={"确认"}
            onOk={() => { setModel_show(false) }}
            onCancel={() => { setModel_show(false) }}

        >


            <Upload listType={"picture-card"} action={'/api/picture/upload'} name={'file'} fileList={fileList} beforeUpload={(file, fileList) => { return beforeUpload(file, fileList) }} onChange={(info) => { onChange(info) }}
                onRemove={(info) => {
                    setFile_picture([])


                    return true
                }}>
                <Button >
                    <Icon type="upload" /> 点击上传
    </Button>

            </Upload>



        </Modal>

        <div className={"edit-item"}>
            <label className={"edit_label"}>问题</label><input className="ant-input edit-input" type="text" value={question_text} onChange={(e) => {
                setQuestion_text(e.target.value)
            }} />
        </div>
        <div className={"edit-function"}>
            <div className={"edit-item"}>
                <label className={"edit_label"}>必答</label>
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={
                    (e) => { setIs_require(e) }
                } />
            </div>
            <div className={"edit-item edit-before-upload"} >
                <label className={"edit_label"}>文本验证</label>
                <Select onChange={(e: any) => {
                    setText_check(e)


                }} defaultValue={0}>
                    {Object.keys(input_check).map((key, index) => (
                        <Option value={index} key={key}>{input_check[key]}</Option>
                    ))

                    }
                </Select>
            </div>
            <div className={"edit-item"}>
                <label className={"edit_label"} >上传图片</label>
                <Tooltip title="上传图片">

                    <Button onClick={() => {
                        setModel_show(true)

                    }}><Icon type="upload" /></Button></Tooltip>
            </div>



        </div>
        <div className={"edit-item"}><Button type="primary" className={"edit_button_submit"} onClick={check}>提交</Button></div>

    </>
}