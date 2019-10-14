import { invalid_method } from "../utils/info"


export function params_async() {
    return async function (ctx: any, next: Function) {
        let params: object = {}
        switch (ctx.method) {
            case "GET":
                params = await ctx.query;
                break;
            case "POST":
                params = await ctx.request.body;

                break;
            default:
                return ctx.body = invalid_method

        }
        ctx.state.private_params = params
        ctx.state.ip = ctx.request.ip

        await next()


    }
}