import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async()=>{
    const lastStudent = await User.findOne(
        {
            role:'student',
        },
        {
            id:1,
            _id:0,

        },
    )
    //descending order sort
    .sort({
        createdAt:-1,
    }).lean()
    return lastStudent?.id?lastStudent.id.substring(6):undefined;
}
export const generateStudentId =async (payload:TAcademicSemester)=>{
    //first time 0000
    //0001=>1

    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
    //2031010001
     const lastStudentSemesterCode = lastStudentId?.substring(0,4);
     const lastStudentYear = lastStudentId?.substring(0,4);
     const currentSemesterCode = payload.code;
     const currentYear = payload.year;
     if(lastStudentId && lastStudentSemesterCode===currentSemesterCode && lastStudentYear=== currentYear){
        currentId = lastStudentId.substring(6);
     }
    let incrementId = (Number(currentId)+1).toString().padStart(4,'0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
}