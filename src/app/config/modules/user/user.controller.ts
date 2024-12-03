import {  Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
const createStudent = catchAsync(async (req: Request, res: Response) => {
    
  const {password,student:studentData} = req.body;
  //data validation using zod
  //  const zodparsedData = studentValidationSchema.parse(student.studdent);
  const result = await UserService.createStudentIntoDB(password,studentData);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student is created successfully',
    data:result
  })
});
  export const UserControllers={
    createStudent
  }