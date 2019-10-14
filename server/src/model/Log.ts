
import { Schema, model } from 'mongoose';
const LogSchema = new Schema({
    request_url: String,
    method: String,
    response_time: String,
    params: { type: Schema.Types.Mixed },
    date: { type: Date, default: Date.now },
    ip: { type: String }

})

export const logs = model("Logs", LogSchema)
