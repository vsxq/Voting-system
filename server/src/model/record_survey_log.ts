import { Schema,model } from 'mongoose';
const record_survey_schema = new Schema({
    ip:String,
    data:{
        type:Date,
        default:Date.now
    },
    submit_id:String,
    survey_id:String

})
export const record_survey_model_log = model("record_survey_log",record_survey_schema)