import * as Readline from "readline"
import * as Fs from "fs"
import { WritableOptions } from "stream";
const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
readline.question(`欢迎使用自动化脚本,本脚本功能强大,极大提高开发效率
不再是粘贴复制
而是定制化的粘贴复制,
请选择你要使用的功能:
1. 增加一个根路由
2. 增加一个control,
3. 增加一个model/interface,
4. 查看我的信息
5. 
5. 我也不知道我要干什么,哈哈哈
`, (name) => {
        switch (name) {
            case "1":
                console.log(`请输入你要增加路由的名称
                说明:
                我会router加一个,
                control新增文件夹,
                请注意你的行为,不要输入奇怪的东西
                不要破坏代码
                `)
                readline.on("line", (line: string) => {
                    line = line.trim()
                    console.log(line)
                    Fs.mkdir(`./src/control/${line}`, (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                    Fs.writeFileSync(`./src/router/${line}.ts`,
                        `import * as Router from "koa-router"
import {route_match_control} from "../utils/route_match"
import {get_file_name} from "../utils/deal_with_something"
let router = new Router()
router = route_match_control(get_file_name(__filename),router)
module.exports = router
                    `, )
                    console.log("有缘江湖相见")
                    readline.close()
        }); 
        
        break;



            default: console.log("非法输入")
            console.log("无药可救,这么简单也能错????")
            readline.close()
break;
        }

    })
