import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
      
      const {password,student:studentData} = req.body;
  
      //data validation using zod
      //  const zodparsedData = studentValidationSchema.parse(student.studdent);
      const result = await UserService.createStudentIntoDB(password,studentData);
    
  
      // Proceed to create the student in the database
     
      return res.status(200).json({
        success: true,
        message: "Student created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  export const UserControllers={
    createStudent
  }