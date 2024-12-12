/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";


const getAllStudentsFromDB=async()=>{
    const result = await Student.find().populate('admissionSemester')
    .populate({
        path:'academicDepartment',
        populate:{
            path:'academicFaculty'
        }
    })
    ;
    return result;
}
const getSingleStudentsFromDB=async(id:string)=>{
     const result = await Student.findOne({id})
     .populate('admissionSemester')
     .populate({
        path:'academicDepartment',
        populate:{
            path:'academicFaculty'
        }
     })
     ;
    
    return result;
}
const updateStudentIntoDB = async(id:string,payload:Partial<TStudent>)=>{
  const {name,guardian,localGuardian,...remainingStudentData}=payload;

  const modifiedUpdatedData:Record<string,unknown>={
    ...remainingStudentData,
  };
  /*non primitive data updation method
  gurdian.fatherOccupation="Teacher"

  */
 if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
 }
 if(guardian && Object.keys(guardian).length){
  for(const [key,value] of Object.entries(guardian)){
    modifiedUpdatedData[`guardian.${key}`] = value;
  }
}
if(localGuardian && Object.keys(localGuardian).length){
  for(const [key,value] of Object.entries(localGuardian)){
    modifiedUpdatedData[`localGuardian.${key}`] = value;
  }
}
console.log(modifiedUpdatedData);
const result = await Student.findOneAndUpdate({id},modifiedUpdatedData,{
  new:true,
  runValidators:true
});
return result;

}
const deleteStudentsFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const deleteStudent = await Student.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session }
      );
  
      if (!deleteStudent) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
      }
  
      const deleteUser = await User.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session }
      );
  
      if (!deleteUser) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
      }
  
      await session.commitTransaction();
      await session.endSession();
      return deleteStudent;
    } catch (err) {
      console.error('Transaction Error:', err);
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete student');
    }
  };
  


export const StudentServices={
  getAllStudentsFromDB,getSingleStudentsFromDB,
    deleteStudentsFromDB,updateStudentIntoDB 
}