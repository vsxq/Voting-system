import { Schema,model } from 'mongoose';
//万一没电了呢
const record_vote_schema = new Schema({ 
    vote_id:String,
    page_view:Number,
    gather:{ type: Schema.Types.Mixed }
 })
export const record_vote_status = model("vote_status",record_vote_schema)
