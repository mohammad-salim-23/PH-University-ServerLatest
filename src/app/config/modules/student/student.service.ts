/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";


const getAllStudentsFromDB=async(query:Record<string,unknown>)=>{
  /*
  const queryObj = {...query};//copying req.query object so that we can mutate the copy object
  const studentSearchableFields=['email','name.firstName','presentAddress'];
  let searchTerm = '';//set default value
  //if searchTerm is given set it
  if(query?.searchTerm){
    searchTerm = query.searchTerm as string;
  }
  //How our format should be for partial match
  /*
  {email:{$regex:query.searchTerm, $options:i}}
  {presentAddress:{$regex:query.searchTerm, $options:i}}
  {'name.firstName':{$regex:query.searchTerm, $options:i}}
  
  
 //We are dynamically doing it using loop
 const searchQuery = Student.find({
  $or: studentSearchableFields.map((field)=>({
    [field]:{$regex:searchTerm,$options:'i'}
  }))
 })
 //Filtering dunctionality
 const excludeFields = ['searchTerm','sort','limit','page', 'fields'];
 excludeFields.forEach((el)=>delete queryObj[el]);//Deleting The fields so that it can't match or filter exactly
 const filterQuery =searchQuery
 .find(queryObj)
 .populate('admissionSemester')
 .populate({
   path: 'academicDepartment',
   populate: {
     path: 'academicFaculty',
   },
 });
 //Sorting functionality
 let sort = '-createdAt';//set default value
 //If sort is give set it
 if(query.sort){
  sort = query.sort as string;
 }
 //Pagination functionality
 let page=1;
 let limit = 1;
 let skip=0;
 //if limit is given set it
 if(query.limit){
  limit = Number(query.limit);
 }
 if(query.page){
  page = Number(query.page);
  skip = (page-1)*limit;
 }
 const sortQuery =filterQuery.sort(sort);
 const paginateQuery = sortQuery.skip(skip);
 const limitQuery = paginateQuery.limit(limit);
 
 //fields limiting functionality
 /**
  * How our format should be for partial match
  * fields:'name,email'; >we are accepting from request
  * fields:'name email';->How it should be
  
 let fields = '-__v';//set default value
 if(query.fields){
  fields = (query.fields as string).split(',').join(' ');
 }
 const fieldQuery = await limitQuery.select(fields);
   return fieldQuery;
   */
  const studentQuery = new QueryBuilder(
    Student.find()
    .populate('admissionSemester')
    .populate({
      path:'academicDepartment',
      populate:{
        path:'academicFaculty'
      }
    }),
    query
  )
  .search(studentSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();
  const result = await studentQuery.modelQuery;
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