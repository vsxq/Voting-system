import { survey_interface } from '../interfaces/Survey';
import { Schema, model, Document, Model } from "mongoose"


export interface survey_interface_model extends survey_interface, Document {

}

const survey_schema = new Schema({
    create_user: { type: String },
    survey_id: { type: String },
    survey_name: { type: String },
    survey_extra: {
        survey_note: { type: String },
        start_date: { type: Number },
        end_data: { type: Number },
        publish: { type: Boolean },
        limit_ip:{type:Boolean,default:false}
    },
    question_container: [
        {
            id: { type: String },
            question_text: { type: String },
            check: { type: Number },
            is_require: { type: Boolean },
            picture: { type: Schema.Types.Mixed },
            rate: { type: Number },
            min_number: { type: Number }, max_number: { type: Number },
            question_type: { type: Number },
            answers: [{type:Schema.Types.Mixed}]
                
        }
    ]
},


);
export const survey_model = model("surveys", survey_schema)