export async function findone(model:any,success_deal_with:Function,error_deal_with:Function,find_param:object,custom:object={}){
    const data = await model.findOne(find_param,{...custom,"_id": 0}).exec()
    if (data) {
       await success_deal_with(data)
    }
    else {
      await  error_deal_with()

    }
}
export async function findall(model:any,success_deal_with:Function,error_deal_with:Function,find_param:object,custom:object={}){
    const data = await model.find(find_param,{...custom,"_id": 0}).exec()
    if (data) {
        success_deal_with(data)
    }
    else {
        error_deal_with()

    }
}


