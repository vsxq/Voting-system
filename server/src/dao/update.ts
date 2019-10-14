export async function update_one(model: any, success_deal_with: Function, error_deal_with: Function, find_param: object, update_param: object) {
    const result = await model.findOneAndUpdate(find_param, update_param).exec()
    if (result) {
        success_deal_with()
    }
    else {
        error_deal_with()
    }

}