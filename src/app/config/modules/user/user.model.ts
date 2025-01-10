import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../..";
import bcrypt from "bcrypt";
const userSchema = new Schema<TUser,UserModel>(
   {
    id:{
       type:String,
       requireed:true,
       unique:true
    },
    password:{
        type:String,
        required:true,
        select:0,
    },
    needPasswordChange:{
        type:Boolean,
        default:true,
    },
    passwordChangedAt:{
       type:Date,
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

userSchema.statics.isUserExistsByCustomId = async function(id:string){
    return await User.findOne({id
    }).select('+password');
}
userSchema.statics.isPasswordMatched = async function(
    plainTextPassword,
    hashedPassword
){
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged=
function(
    passwordchangedTimestamp:Date, jwtIssuedTimestamp:number
){
    const passwordChangedTime = new Date(passwordchangedTimestamp).getTime()/1000;
    return passwordChangedTime>jwtIssuedTimestamp;
}
export const User = model<TUser, UserModel>('User',userSchema);