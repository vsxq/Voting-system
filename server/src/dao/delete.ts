import { findone } from "./find"
import { delete_success, delete_fail } from "./../utils/info"
export async function delete_one(model: any, delete_param: object) {
    //避免恶意攻击,在删除前进行关联性检查
    let body = {}
    await findone(model, async () => {

        await model.deleteOne(delete_param)
    },
        () => { body = delete_fail }
        , delete_param)
    body = (Object.keys(body).length === 0) ? delete_success : delete_fail
    return body

}