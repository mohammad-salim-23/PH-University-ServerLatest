import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async(payload:TAcademicSemester)=>{

        //academicSemesterNameCoderMapper['Fall'];//'03'
    if(academicSemesterNameCodeMapper[payload.name]!==payload.code){
        throw new Error('Invalid Semester code');
    }
    const result = await AcademicSemester.create(payload);
    return result;
    
}

export const AcademicSemesterServices={
    createAcademicSemesterIntoDB
}