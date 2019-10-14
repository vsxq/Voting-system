import {  message } from 'antd';
export function beforeUpload(file,fileList) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('只允许上传图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('只允许上传小于2m的图片');
    }
    const status=isJPG && isLt2M
    if(!status){
        fileList.pop()
    }
    if(FileList.length>1){
        fileList.slice(-1)
    }
    return isJPG && isLt2M;
  }
 export  const picture_props = {
    name: 'file',
    action: '/api/picture/upload',
    headers: {
      authorization: 'authorization-text',
    },
    listType:"picture-card"
 
    
   
  };