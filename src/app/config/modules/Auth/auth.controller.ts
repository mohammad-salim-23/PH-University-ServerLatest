import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../..";

const loginUser = catchAsync(async (req, res)=>{
    const result  = await AuthServices.loginUser(req.body);
    const {refreshToken, accessToken, needsPasswordChange} = result;

    res.cookie('refreshToken', refreshToken,
        {
            secure:config.NODE_ENV === 'production',
            httpOnly:true
        }
    )
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success: true,
    message: 'User is logged in succesfully!',
    data:{
        accessToken,
        needsPasswordChange
    }
    })
})
const changePassword = catchAsync(async(req , res)=>{
    const {...passwordData} = req.body;

    const result = await AuthServices.changePasword(req.user, passwordData);
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success: true,
        message: 'Password is updated succesfully!',
        data: result,
    })
})
export const AuthControllers = {
    loginUser,
    changePassword
}