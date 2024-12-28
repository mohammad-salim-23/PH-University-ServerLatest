import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async(req , res)=>{
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:'Course is created succesfully',
        data:result
    })
});
const getAllCourse = catchAsync(async (req, res)=>{
    const result = await CourseServices.getAllCourseFromDB(req.query);
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message: 'Course are retrieved successfully',
        data:result,
    });
});
const getSingleCourse = catchAsync(async (req, res)=>{
    const {id} = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message: 'Course is retrieved succesfully',
        data:result
    });
});
const updateCourse = catchAsync(async (req , res)=>{
    const {id} = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message: 'course is updated succesfully',
    data: result,
    })
})
const deleteCourse = catchAsync(async (req , res)=>{
    const {id} = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message: 'Course is deleted succesfully',
        data:result
    });
});
const assignFacultiesWithCourse = catchAsync(async ( req, res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
        courseId,
        faculties
    );
    sendResponse(res , {
       statusCode:StatusCodes.OK,
       success:true,
       message: 'Faculties assigned  succesfully',
       data: result,
    })
})
const removeFacultiesFromCourse = catchAsync(async (req , res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(courseId,
         faculties
    )
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message: 'Faculties removed  succesfully',
        data: result,
    })
})
export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourse,
    updateCourse ,
    deleteCourse,
    assignFacultiesWithCourse ,
    removeFacultiesFromCourse
}