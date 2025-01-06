/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser{
    id:string;
    password:string;
    needPasswordChange:boolean;
    passwordChangedAt?:Date;
    role:'admin'|'student'|'faculty';
    status:'in-progress'|'blocked';
    isDeleted:boolean;
}
export interface UserModel extends Model<TUser>{
    //instance methods for checking if the user exists
    isUserExistsByCustomId (id:string):Promise<TUser>;
        //instance methods for checking if passwords are matched

    isPasswordMatched(
        plainTextPassword:string,
        hashedPassword:string,
    ):Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordchangedTimestamp:Date, jwtIssuedTimestamp:number
  ):boolean
}
export type TUserRole = keyof typeof USER_ROLE;