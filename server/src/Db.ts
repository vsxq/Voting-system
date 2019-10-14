import { connect, set } from "mongoose"
import { db_address, usr, passwd } from "../config";
import { print_mongoose_exit, print_mongoose_login } from "./log"

class Db {

    private db_url: string = `mongodb://${usr}:${passwd}@${db_address}`
    static instance: null | Db = null//单例模式.避免数据库多次重复链接
    constructor() {
        set('useFindAndModify', false)
        this.connect()
    }
    private connect() {

        connect(this.db_url, { useNewUrlParser: true, useFindAndModify: false })

        print_mongoose_login(this.db_url)
    }
    public static getInstance(): Db {

        if (!this.instance) {
            this.instance = new Db();
        }
        return this.instance;
    }

}



export const db = Db.getInstance
