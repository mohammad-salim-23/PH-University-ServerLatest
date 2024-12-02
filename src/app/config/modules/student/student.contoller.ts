import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";

const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    return res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    return res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async(req:Request,res:Response,next:NextFunction)=>{
  try{
const {studentId} = req.params;
const result = await StudentServices.deleteStudentsFromDB(studentId);
return res.status(200).json({
  success: true,
  message: "Student id deleted successfully",
  data: result,
});
  }catch(error){
    next(error);
  }
}
export const StudentControllers = { 
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
