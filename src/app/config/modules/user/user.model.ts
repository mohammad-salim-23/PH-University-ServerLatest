import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../..";
import bcrypt from "bcrypt";
const userSchema = new Schema<TUser>(
   {
    id:{
       type:String,
       requireed:true,
    },
    password:{
        type:String,
        required:true,
    },
    needPasswordChange:{
        type:Boolean,
        default:true,
    },
    role:{
        type:String,
        enum:['student','faculty','admin']
    },
   status:{
    type:String,
    enum:['in-progress','blocked'],
    default:'in-progress'
   },
   isDeleted:{
    type:Boolean,
    default:false
   }
   },
   {
    timestamps:true
   }
);
//pre save middleware/hook:will work on create() save()
userSchema.pre('save',async function(next){
    //    hashing password and save into DB
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;//doc
    user.password=await bcrypt.hash(user.password, Number(config.bcrypt_salt_round));
    next();
    })
    // set '' after saving password
        userSchema.post('save',function(doc,next){
        doc.password='';
      next();
    })
    
export const User = model<TUser>('User',userSchema);