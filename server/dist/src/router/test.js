"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const router = require("koa-router");
const User_1 = require("../model/User");
const config_1 = require("../../config");
const Router = new router({
    prefix: '/api'
});
exports.Router = Router;
function check_object_has_property(o, ...values) {
    for (let val of values) {
        if (o.state.private_params[val] === undefined) {
            return false;
        }
        else {
            if (o.state.private_params[val] === "") {
                return false;
            }
        }
    }
    return true;
}
Router.use(async (ctx, next) => {
    let params = {};
    switch (ctx.method) {
        case "GET":
            params = await ctx.query;
            break;
        case "POST":
            params = await ctx.request.body;
            break;
        default:
            return ctx.body = "非法的请求方式";
    }
    ctx.state.private_params = params;
    if (ctx.request.path.includes("/login") || ctx.request.path.includes("/upload")) //特例
     {
        await next();
    }
    else {
        if (check_object_has_property(ctx, "jwt")) {
            const token = ctx.state.private_params.jwt;
            jwt.verify(token, config_1.jwt_secret, (err, decoded) => {
                console.log(err);
                if (err || !decoded)
                    return ctx.body = {
                        status: "error",
                        error_message: "invalid token",
                        error_info: err
                    };
                else {
                    ctx.state.private_params.name = decoded.name;
                    console.log(decoded);
                    next();
                }
            });
        }
        else {
            ctx.status = 401;
            return ctx.body = "非法访问,请重新登录";
        }
    }
});
Router.post("/upload", async (ctx) => {
    const file = ctx.request.files;
    console.log(file);
    return ctx.body = "上传成功！";
    // 获取上传文件
    //const reader = fs.createReadStream(file.path);	// 创建可读流
    //const ext = file.name.split('.').pop();		// 获取上传文件扩展名
    //const upStream = fs.createWriteStream(`/upload/${Math.random().toString()}.${ext}`);		// 创建可写流
    //reader.pipe(upStream);	// 可读流通过管道写入可写流
    return ctx.body = 123;
});
Router.get("/upload", async (ctx) => {
    ctx.body = `
    <h1>koa2 upload demo</h1>
    <form method="POST" action="/api/upload" enctype="multipart/form-data">
      <p>file upload</p>
      <span>picName:</span><input name="picName" type="text" /><br/>
      <input name="file" type="file" /><br/><br/>
      <button type="submit">submit</button>
    </form>
    `;
});
Router.post("/login", async (ctx) => {
    return ctx.body = 122;
});
Router.get("/login", async (ctx, next) => {
    const login_param = ["user", "passwd"];
    if (!check_object_has_property(ctx, ...login_param)) {
        return ctx.body = "参数不全";
    }
    const { user, passwd } = ctx.state.private_params;
    ctx.state.name = user;
    const data = await User_1.Users.findOne({
        user,
        passwd
    }).exec();
    if (data) {
        const token = await jwt.sign({
            user: user
        }, config_1.jwt_secret, {
            expiresIn: "30s"
        }); //测试阶段30stoken过期
        return ctx.body = {
            status: "login success",
            token: token
        };
    }
    else {
        ctx.response.status = 401;
        return ctx.body = {
            status: "error",
            error: "invaild user or passwd incorrent"
        };
    }
});
Router.get("/test", async (ctx) => {
    ctx.response.status = 401;
    ctx.body = "test";
});
Router.post("/test", async (ctx) => {
    ctx.body = ctx.request.body;
});
//# sourceMappingURL=test.js.map