import { Schema,model } from 'mongoose';
const record_vote_schema = new Schema({
    ip:String,
    data:{
        type:Date,
        default:Date.now
    },
    submit_id:String,
    vote_id:String,
    player_id:String,
    
})
export const record_vote_model_log = model("record_vote_log",record_vote_schema)