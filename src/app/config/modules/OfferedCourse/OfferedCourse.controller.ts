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
// const deleteOfferedCourseFromDB = catchAsync( async (req, res)=>{
//     const {id} = req.params;
//     const result = await OfferedCourseServices
// })
export const OfferedCourseControllers = {
    createOfferedCourse
}