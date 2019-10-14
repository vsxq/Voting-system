import { connection } from "mongoose"
import * as config from "../config"
export function print_mongoose_login(db_url: string): void {
    //正常链接    

    connection.on('connected', function () {
        console.log('Mongoose connection open to ' + db_url);
    });

    //连接异常

    connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
    });
}

//连接断开
export function print_mongoose_exit(): void {
    connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });
}
export function print_koa_start():void{
    console.log(`Server running on port ${config.port}`);
    
}