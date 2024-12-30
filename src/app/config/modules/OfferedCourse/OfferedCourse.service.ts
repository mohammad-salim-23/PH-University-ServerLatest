import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartmentt/academicDepartment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { OfferedCourse } from "./OfferedCourse.model";
import { hasTimeConflict } from "./OfferedCourse.utils";

const createOfferCourseIntoDB = async(payload:TOfferedCourse)=>{
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        section,
        faculty,
        days,
        startTime,
        endTime
    } = payload;
    /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */
   //check if the semester registration id is exists!
   const isSemesterRegistrationExists = 
   await SemesterRegistration.findById(semesterRegistration);

   if(!isSemesterRegistrationExists){
    throw new AppError(
        StatusCodes.NOT_FOUND,
        'Semester registration not found!'
    );
   }

   const academicSemester = isSemesterRegistrationExists.academicSemester;
   const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
   if(!isAcademicFacultyExists){
    throw new AppError(
        StatusCodes.NOT_FOUND,
        'Academic Faculty not found!'
    );
   }
   const isAcademicDepartmentExists  = await AcademicDepartment.findById(academicDepartment);
   if(!isAcademicDepartmentExists){
    throw new AppError(
        StatusCodes.NOT_FOUND,
        'Academic Department not found!'
    );
   }
   const isCourseExists = await Course.findById(course);
   if(!isCourseExists){
    throw new AppError(
        StatusCodes.NOT_FOUND,
        'Course  not found!'
    );
   }
   const isFacultyExists = await Faculty.findById(faculty);
   if(!isFacultyExists){
    throw new AppError(
        StatusCodes.NOT_FOUND,
        'Academic Faculty not found!'
    );
   }
   // check if the department is belong to the faculty
   const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id:academicDepartment,
    academicFaculty
   });

   if(!isDepartmentBelongToFaculty){
    throw new AppError(
        StatusCodes.BAD_REQUEST,
       `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
    );
   }

   const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = 
   await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section
   });

   if(isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection){
    throw new AppError(
        StatusCodes.BAD_REQUEST,
        `Offered course with same section is already exist!`
    )
   }
 // get the schedule of the faculties 
 const assignSchedules = await OfferedCourse.find(
    {
        semesterRegistration,
        faculty,
        days:{$in:days},
    }
 ).select('days startTime endTime');
 const newSchedule = {
    days,
    startTime,
    endTime
 };
 if(hasTimeConflict(assignSchedules, newSchedule)){
    throw new AppError(
        StatusCodes.CONFLICT,
        `This faculty is not available at that time ! Choose other time or day`
    );
 }
  const result = await OfferedCourse.create(
    {
        ...payload,
        academicSemester
    }
  );
  return result;
}