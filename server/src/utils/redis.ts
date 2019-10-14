import * as Redis from "redis"
import { promisify } from "util"
import { redis_address, redis_port } from "./../../config"
export const client = Redis.createClient(redis_port, redis_address)
client.on("error", (err) => {
    console.log(err)
})
export const get_string_async = promisify(client.get).bind(client);
export const set_string_async = promisify(client.set).bind(client);
export const incr_string_async = promisify(client.incr).bind(client)

