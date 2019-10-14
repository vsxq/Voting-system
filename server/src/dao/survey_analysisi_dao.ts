import { record_survey_model } from "../model/record_survey"
export async function get_data(survey_id: string, success_deal_with: Function, ) {
    const data = await record_survey_model.aggregate().match({ survey_id }).group({ _id: "$question_id", result: { $push: "$answer_value" } }).exec()

    
        await success_deal_with(data)
    
     


}