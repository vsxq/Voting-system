export function upload_get_control() {
    return async function (ctx: any, next: Function) {
        ctx.body = `
        <h1>koa2 upload demo</h1>
        <form method="POST" action="/api/upload" enctype="multipart/form-data">
          <p>file upload</p>
          <span>picName:</span><input name="picName" type="text" /><br/>
          <input name="file" type="file" /><br/><br/>
          <button type="submit">submit</button>
        </form>
        `
    }
   
   }
   export function upload_post_control() {
    return async function (ctx: any, next: Function) {
        const file = ctx.request.files

        console.log(file);
    
    
        return ctx.body = "上传成功！";
    
        // 获取上传文件
    
    
        //const reader = fs.createReadStream(file.path);	// 创建可读流
        //const ext = file.name.split('.').pop();		// 获取上传文件扩展名
        //const upStream = fs.createWriteStream(`/upload/${Math.random().toString()}.${ext}`);		// 创建可写流
        //reader.pipe(upStream);	// 可读流通过管道写入可写流
        return ctx.body = 123
    }
   
   }   