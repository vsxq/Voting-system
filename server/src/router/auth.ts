import * as Router from "koa-router"
import {route_match_control} from "../utils/route_match"
import {get_file_name} from "../utils/deal_with_something"
let router = new Router()
router = route_match_control(get_file_name(__filename),router)
module.exports = router