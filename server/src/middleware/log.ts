import { logs} from "../model/Log"
export function log() {
    return async function (ctx: any, next: Function) {

        const date = Date.now()
        
        await next()
        const response_time:string=`${Date.now()-date}ms`
        const method = ctx.method
        const request_url= ctx.request.path
        const ip =ctx.state.ip 
        if(1===1){
        const params=ctx.state.private_params
            new logs({response_time,method,request_url,params,ip}).save()
            
        }else{
            //如果是图片的话,不记录参数,
        }
        

    }
}