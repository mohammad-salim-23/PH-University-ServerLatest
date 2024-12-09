import {  Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../../utils/sendResponse";

import catchAsync from "../../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
const createStudent = catchAsync(async (req: Request, res: Response) => {
    
  const {password,student:studentData} = req.body;
  
  const result = await UserService.createStudentIntoDB(password,studentData);

  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student is created successfully',
    data:result
  })
});
  export const UserControllers={
    createStudent
  }