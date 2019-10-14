"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = require("debug");
const Koa = require("koa");
const koaBody = require("koa-body");
const Db_1 = require("./Db");
const config_1 = require("../config");
const log_1 = require("./log");
const test_1 = require("./router/test");
const User_1 = require("./model/User");
const path = require("path");
const app = new Koa();
//jinja2.configure('src/views', { autoescape: true });
const debug = Debug("vtop");
debug("ok,every thing");
debug("sfe");
Db_1.db();
let cc = new User_1.Users({
    user: "admin",
    passwd: "admin"
});
//cc.save()
app.keys = ['some secret hurr'];
app.use(koaBody({
    multipart: true,
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'upload/'),
        maxFileSize: 2 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(test_1.Router.routes());
app.listen(config_1.port);
log_1.print_koa_start();
//# sourceMappingURL=server.js.map