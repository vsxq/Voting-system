//数据库静态配置
const usr: string = "root"
const passwd: string = "123456"
const db_address: string = "localhost:27017/mydb"
const redis_address='127.0.0.1'
const redis_port=6379

const jwt_secret: string = "are you ok"
//koa静态配置
const port: number = 3033
//jwt有效时间,格式,10h,2s
//测试阶段10h jwt 失效
const jwt_duration = "10h"
//refresh时间,格式s,
const refresh_time = 5 * 60 * 60





export { usr, passwd, db_address, port, jwt_secret, refresh_time, jwt_duration,redis_address,redis_port }