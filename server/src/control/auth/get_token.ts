import { login_invalid_passwd, login_invalid_user, incomplete_param_info, success_info } from './../../utils/info';
import { check_state_object_has_property } from "../../utils/check"
import {
    Users
} from "../../model/User"
import * as jwt from "jsonwebtoken"
import { jwt_secret ,jwt_duration} from "../../../config"
import { findone } from "../../dao/find"
import * as bcrypt from "bcrypt"



function control() {
    return async function (ctx: any, next: Function) {

        const login_param: string[] = ["user", "passwd"]
        if (!check_state_object_has_property(ctx, ...login_param)) {
            return ctx.body = incomplete_param_info
        }

        const {
            user,
            passwd
        } = ctx.state.private_params


        return await findone(Users, async (data: any) => {
            const db_passwd = data.get("passwd")
            const level =data.get("level")
            if (bcrypt.compareSync(passwd, db_passwd)) {
                const token = await jwt.sign({
                    user: user
                }, jwt_secret, {
                        expiresIn: jwt_duration
                    }) 
                ctx.body = { ...success_info, token, date: Date.now(),level }
            }
            else {
                ctx.body = login_invalid_passwd
            }
        }, () => {
            ctx.body = login_invalid_user
        }, { user })

    }

}
module.exports = {
    method: "GET",
    function: control
}