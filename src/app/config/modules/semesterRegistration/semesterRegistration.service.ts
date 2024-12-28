import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import QueryBuilder from "../../../builder/QueryBuilder";

const createSemesterRegistrationIntoDB = async(
    payload:TSemesterRegistration,
)=>{
     /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */
  const academicSemester = payload?.academicSemester;
   //  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   const isThereAnyUpcomingOrOngoingSEmester=
   await SemesterRegistration.findOne({
    $or:[
        {status:RegistrationStatus.UPCOMING},
        {status:RegistrationStatus.ONGOING},
    ],
   });
   if(isThereAnyUpcomingOrOngoingSEmester){
    throw new AppError(
        StatusCodes.BAD_REQUEST,
        `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester!`
    );
   }
   // check if the semester is exist
   const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
   if(!isAcademicSemesterExists){
    throw new AppError(StatusCodes.NOT_FOUND,
        'This academic semester not found!'
    )
   }
   //check if the semester is already registerd!
   const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
   })
   if(isSemesterRegistrationExists){
    throw new AppError(
        StatusCodes.CONFLICT,
        'This semester is already registerd!',
    );
   }
   const result = await SemesterRegistration.create(payload);
   return result;
};
const getAllSemsterRegistrationFromDB = async(
    query:Record<string,unknown>,
)=>{
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'),
        query,
    )
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
};
const getSingleSemesterRegistrationFromDB = async(id:string)=>{
    const result = await SemesterRegistration.findById(id);
    return result;
}
export const SemesterRegistrationService={
    createSemesterRegistrationIntoDB,
    getAllSemsterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB
}