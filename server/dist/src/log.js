"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config = require("../config");
function print_mongoose_login(db_url) {
    //正常链接    
    mongoose_1.connection.on('connected', function () {
        console.log('Mongoose connection open to ' + db_url);
    });
    //连接异常
    mongoose_1.connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
    });
}
exports.print_mongoose_login = print_mongoose_login;
//连接断开
function print_mongoose_exit() {
    mongoose_1.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });
}
exports.print_mongoose_exit = print_mongoose_exit;
function print_koa_start() {
    console.log(`Server running on port ${config.port}`);
}
exports.print_koa_start = print_koa_start;
//# sourceMappingURL=log.js.map