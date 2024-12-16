/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../..";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createStudentIntoDB = async(password:string,payload:TStudent)=>{

    //create a user object
    const userData:Partial<TUser>={};
    //if password is not given, use default password
    userData.password = password || (config.default_pass as string);
    //set student role
    userData.role='student';
   //find academic semester info
   const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
   )
   if(!admissionSemester){
    throw new Error('admissionSemester not found');
   }
   //transection and rollback mongoose session
   const session = await mongoose.startSession();
   try{
  //set generated it
     session.startTransaction();
  userData.id = await generateStudentId(admissionSemester);

  //create a user (transaction-1)
  const newUser= await User.create([userData],{session});//array
  
  //create a student
  if(!newUser.length){
    throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create user');
  }
   //set id, _id as user
   payload.id = newUser[0].id;
   payload.user = newUser[0]._id;//refference id
 //create a student(transaction-2)
  const newStudent = await Student.create([payload],{session});
  if(!newStudent.length){
    throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create student');
  }
  await session.commitTransaction();
  await session.endSession();
  return newStudent;
    }catch(err:any){
        await session.abortTransaction();
        console.error(err);
        await session.endSession();
        throw new Error(err);
    }
}
export const UserService={
    createStudentIntoDB 
}