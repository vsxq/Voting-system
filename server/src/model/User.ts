
import { Schema,model } from 'mongoose';
const UserSchema = new Schema({
    user:String,
    passwd:String,
    level:String,
    sex:Boolean,
    
    

})

export const Users = model("Users",UserSchema)
