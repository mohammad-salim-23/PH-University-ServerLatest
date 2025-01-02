import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload:TLoginUser)=>{
    //checking if the user is exist
    const user = await User.isUserExistsByCustomId(payload.id);
    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND, 'THis user is not found!');
    }
    // checking if the user is already deleted
     const isDeleted = user?.isDeleted;
     if(isDeleted){
        throw new AppError(StatusCodes.FORBIDDEN, 'THis user is deleted!');
     }
     //checking if the user is blocked
     const userStatus = user?.status;
     if(userStatus === 'blocked'){
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
     }
     // checking if the password is correct
     if(!(await User.isPasswordMatched(payload?.password,user?.password))){
        throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
     }
   
}
export const AuthServices={
    loginUser
}