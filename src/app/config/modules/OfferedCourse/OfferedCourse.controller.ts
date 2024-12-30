import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { OfferedCourseServices } from "./OfferedCourse.service";

const createOfferedCourse = catchAsync(async (req, res)=>{
    const result = await OfferedCourseServices.createOfferCourseIntoDB(
        req.body
    );
    sendResponse(res , {
        statusCode:StatusCodes.OK,
        success:true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
});
const getAllOfferedCourse = catchAsync(async ( req , res)=>{
    const result = await OfferedCourseServices.getAllOfferedCourseFromDB(req.query);
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true, 
        message:'Offeredcourse retrieved succesfully',
        data:result
    });
});
const getSingleofferedCouurse = catchAsync( async (req , res)=>{
    const {id} = req.params;
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message:'OfferedCourse is retrieved successfully',
        data:result
    })
})
const updateOfferdcourse = catchAsync(async (req, res)=>{
    const {id} = req.params;
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
        id, 
        req.body
    );
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message: 'OfferedCourse updated successfully',
    data: result,
    })
})
const deleteOfferedCourseFromDB = catchAsync( async (req, res)=>{
    const {id} = req.params;
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
    sendResponse(res, {
        statusCode:StatusCodes.OK,
        success:true,
        message: 'OfferedCourse updated successfully',
        data: result,
    })
})
export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleofferedCouurse,
    updateOfferdcourse,
    deleteOfferedCourseFromDB
}