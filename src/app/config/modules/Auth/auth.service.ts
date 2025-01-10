import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import  jwt,{ JwtPayload } from "jsonwebtoken";
import config from "../..";
import bcrypt from 'bcrypt';
import { createToken } from "./auth.utils";
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
     //create token and sent to the client
     const jwtPayload = {
      userId:user.id,
      role:user.role
     }
     const accessToken = createToken(jwtPayload, 
      config.jwt_access_secret as string, 
      config.jwt_access_expires_in  as string
   
     );

     //refresh Token
   const refreshToken = createToken(
      jwtPayload, 
      config.jwt_refresh_secret as string, 
      config.jwt_refresh_expires_in  as string
   
   )
     return {accessToken,
      refreshToken ,
        needsPasswordChange:user.needPasswordChange
     };
     
   

}
const changePasword = async(
   userData:JwtPayload,
   payload:{oldPassword:string; newPassword:string},
)=>{
   //checking if the user is exist
   const user = await User.isUserExistsByCustomId(userData.userId);
   if(!user){
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
   }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
  
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
    }
     //checking if the password is correct
     if(!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
      throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
   //hash new password
   const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_round)
   );
   await User.findOneAndUpdate(
      {
         id:userData.userId,
         role:userData.role,
      },
      {
         password:newHashedPassword,
         needPasswordChange:false,
         passwordChangedAt:new Date()
      }
   )
   return null;
}
const refreshToken = async(token:string)=>{
    // checking if the given token is valid
   
    const decoded  = jwt.verify(token,config.jwt_refresh_secret as string) as JwtPayload;
    
        
    const {userId,iat} = decoded; 
   
    const user = await User.isUserExistsByCustomId(userId);
if(!user){
  throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
}
// checking if the user is already deleted
const isDeleted = user?.isDeleted;
if (isDeleted) {
  throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
}

// checking if the user is blocked

const userStatus = user?.status;

if (userStatus === 'blocked') {
  throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
}

if(user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)){
    throw new AppError(StatusCodes.UNAUTHORIZED,'You are not authorized!')
}
const jwtPayload = {
   userId:user.id,
   role:user.role

};
const accessToken = createToken(
   jwtPayload,
   config.jwt_access_secret as string,
   config.jwt_access_expires_in as string,
);
return{
   accessToken
};
    
}
export const AuthServices={
    loginUser,
    changePasword,
    refreshToken
}