"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
const log_1 = require("./log");
class Db {
    constructor() {
        this.db_url = `mongodb://${config_1.usr}:${config_1.passwd}@${config_1.db_address}`;
        this.connect();
    }
    connect() {
        mongoose_1.connect(this.db_url, { useNewUrlParser: true });
        log_1.print_mongoose_login(this.db_url);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Db();
        }
        return this.instance;
    }
}
Db.instance = null; //单例模式.避免数据库多次重复链接
exports.db = Db.getInstance;
//# sourceMappingURL=Db.js.map