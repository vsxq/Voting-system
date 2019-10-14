import { useContext, useState } from 'react'
import * as React from 'react';
import { Context_answer } from "../redux/answers_redux"
import { Icon, Button, message, Tooltip, Modal,Upload } from 'antd';
import { beforeUpload } from "../utils/picture"
import { char_num_object } from "./../utils/enum"
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '/js/iconfont.js',
});
export const Answer_area = () => {

    const { state, dispatch } = useContext(Context_answer);

    return (<>

        {state.map((value, index) =>
            <Answer id={value.id} key={value.id} index={index} text={value.text} picture={value.picture}></Answer>
        )}


    </>
    )
}
export const Answer = ({ ...props }) => {

    const id = props.id
    const [fileList, setFile_picture] = useState(props.picture)
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

        dispatch({ type: "PICTURE", payload: { id, picture: fileList } })

    }

    React.useEffect(() => {
        if (props.picture.length !== 0) {
            setFile_picture(props.picture)

        }
    }, [props])



    const text = props.text

    const [model_show, setModel_show] = useState(false)
    const { state, dispatch } = useContext(Context_answer);

    const lab = `选项 ${char_num_object[props.index]}`
    return (<>
        <Modal
            title="图片"
            visible={model_show}
            cancelText={"返回"}
            okText={"确认"}
            onOk={() => { setModel_show(false) }}
            onCancel={() => { setModel_show(false) }}
        >


            <Upload  listType={"picture-card"} action={'/api/picture/upload'} name={'file'} fileList={fileList} beforeUpload={(file, fileList) => { return beforeUpload(file, fileList) }} 
            onChange={(info) => { onChange(info) }} 
            onRemove={(info)=>{
                setFile_picture([])

        dispatch({ type: "PICTURE", payload: { id, picture: [] } })
                return true}}>
                <Button >
                    <Icon type="upload" /> 点击上传
    </Button>

            </Upload>

            

        </Modal>

        <div className={"answer_item"}>
            <label className={"edit_label"}>{lab}</label><input type="text" value={text} className="ant-input edit-input" onChange={(e) => {

                dispatch({ type: "CHANGE_TEXT", payload: { text: e.target.value, id } })

            }} />
            <Tooltip title="在下方新增一行"><Button onClick={() => {
                dispatch({ type: "ADD_DOWN", payload: id })
            }}><IconFont type="icon-jia" /></Button></Tooltip>
            <Tooltip title="删除当前项，注意至少要保留两个个选项">
                <Button onClick={() => {
                    dispatch({ type: "DELETE", payload: id })
                }}

                ><IconFont type="icon-jian" /></Button>
            </Tooltip>
            <Tooltip title="上传图片">

                <Button onClick={() => {
                    setModel_show(true)

                }}><Icon type="upload" /></Button></Tooltip>

        </div>


    </>)
}