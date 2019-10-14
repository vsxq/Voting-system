
import { Schema, model, Document, Model } from "mongoose"
import { generate } from "shortid";


const vote_schema = new Schema({
    create_user: { type: String },
    vote_id: { type: String },
    vote_name: { type: String },
    vote_img: { type: Schema.Types.Mixed },
    player_container: [{
        player_id: { type: String },
        
        player_img: { type: Schema.Types.Mixed },
       
        player_name: { type: String }
    }
    ]


},


);
export const vote_model = model("votes", vote_schema)