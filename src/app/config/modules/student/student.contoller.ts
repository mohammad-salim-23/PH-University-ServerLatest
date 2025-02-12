
import { StudentServices } from "./student.service";
import sendResponse from "../../../utils/sendResponse";

import catchAsync from "../../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";


const getAllStudents = catchAsync(async (req, res) => {
 
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student are retrieved successfully',
    data:result
  })

})
const getSingleStudent = catchAsync(async (req, res) => {
 
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(studentId);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student is retrieved successfully',
    data:result
  })

});
const updateStudent = catchAsync(async(req,res)=>{
  const {studentId} = req.params;
  const {student} = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId,student);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student is updated successfully',
    data:result
  })
})
const deleteStudent = catchAsync(async(req,res)=>{
 
  const {studentId} = req.params;
  const result = await StudentServices.deleteStudentsFromDB(studentId);
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    success:true,
    message:'Student is created successfully',
    data:result
  })
   
  })
export const StudentControllers = { 
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};


