import * as Debug from "debug";
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Redis from "redis"
import {
    db
} from "./Db"
import {
    port
} from "../config";
import {
    print_koa_start
} from "./log"
import { router } from './router/base_router'

import * as path from "path"


const app = new Koa();

const debug = Debug("vtop")
debug("ok,every thing")
debug("sfe")
db()

app.keys = ['some secret hurr'];



app.use(koaBody({
    multipart: true,
    //encoding: 'gzip', 加上这句话解析不了json请求,纪念我浪费的一下午
    //json:true,
    //jsonStrict:false,
    /**
     * 
     */
    formidable: {
        uploadDir: path.join(__dirname, 'upload/'), // 设置文件上传目录
        maxFileSize: 2 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }

}));
app.use(router.routes())

app.listen(port);



print_koa_start()