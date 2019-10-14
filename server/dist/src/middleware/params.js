"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function params() {
    return async function (ctx, next) {
        let params = {};
        switch (ctx.method) {
            case "GET":
                params = ctx.params;
                break;
            case "POST":
                params = ctx.request.body;
                break;
            default:
                return ctx.body = "非法的请求方式";
        }
        ctx.state.private_params = params;
        await next();
    };
}
exports.params = params;
//# sourceMappingURL=params.js.map