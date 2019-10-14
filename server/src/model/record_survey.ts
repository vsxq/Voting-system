import { Schema,model } from 'mongoose';
const record_survey_schema = new Schema({
    "survey_id":String,
    
    "question_id":String,
    "answer_value":{
         type: Schema.Types.Mixed
    },
    "submit_id":String
})
export const record_survey_model = model("record_survey",record_survey_schema)