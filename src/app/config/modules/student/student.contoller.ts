import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../../utils/sendResponse";
import { httpStatus} from "http-status";

//catchAsync
const catchAsync=(fn:RequestHandler)=>{
  return (req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch(err)=>next(err);
  }
}
const getAllStudents = catchAsync(async (req, res,next) => {
 
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student is created successfully',
    data:result
  })

})
const getSingleStudent = catchAsync(async (req, res,next) => {
 
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(studentId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student is created successfully',
    data:result
  })

});
const deleteStudent = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
 
  const {studentId} = req.params;
  const result = await StudentServices.deleteStudentsFromDB(studentId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Student is created successfully',
    data:result
  })
   
  })
export const StudentControllers = { 
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
function err(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}

