/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import AppError from "../../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createCourseIntoDB = async(payload:TCourse)=>{
    const result = await Course.create(payload);
    return result;
}
const getAllCourseFromDB = async(query:Record<string,unknown>)=>{
    const courseQuery = new QueryBuilder(
        Course.find(),
    query,
    )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

 const result = await courseQuery.modelQuery;
 return result;

}
const getSingleCourseFromDB = async(id:string)=>{
    const result = await Course.findById(id).populate (
        'preRequisiteCourses.course',
    );
    return result;

};
// update
const updateCourseIntoDB = async(id:string, payload:Partial<TCourse>)=>{
    const {preRequisiteCourses, ...courseRemainingData} = payload;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        // step-1: basic course info update
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new:true,
                runValidators:true,
                session
            }
        );
        if(!updateBasicCourseInfo){
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!');
        }
        //check if there is any pre requisite courses to update
        if(preRequisiteCourses && preRequisiteCourses.length>0){
            //filter out the deleted fields 
            const deletedPreRequisites = preRequisiteCourses.filter((el)=>el.course && el.isDeleted)
            .map((el)=>el.course);
            const deletedPrerequisteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull:{
                        preRequisiteCourses:{course:{$in:deletedPreRequisites}},
                    },
                   
                },
                {
                    new:true,//Ensures that the updated document is returned.
                    runValidators:true,//Ensures that any validators defined on the schema are run when the update happens.
                    session
                }
            );
            if(!deletedPrerequisteCourses){
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!');
            }
            //filter out the new course fields 
            const newPreRequisites = preRequisiteCourses?.filter((el)=>el.course && !el.isDeleted,);
            const newPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet:{preRequisiteCourses:{$each:newPreRequisites}},
                },
                {
                    new:true,
                    runValidators:true,
                    session,
                }
            );
            if(!newPreRequisiteCourses){
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!');
            }

        }
        await session.commitTransaction();
        await session.endSession();
        const result = await Course.findById(id).populate('preRequisiteCourses.course',);
        return result;
    }catch(err:any){
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to update course')
       throw new Error(err);
    }
};
const deleteCourseFromDB = async(id:string)=>{
    const result = await Course.findByIdAndUpdate(
        id,
        {
           isDeleted:true, 
        },
        {new:true},
    );
    return result;
}
export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB
}