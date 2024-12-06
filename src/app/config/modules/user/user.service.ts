import config from "../..";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async(password:string,payload:TStudent)=>{

    //create a user object
    const userData:Partial<TUser>={};
    //if password is not given, use default password
    userData.password = password || (config.default_pass as string);
    //set student role
    userData.role='student';
   //find academic semester info
   const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
   )
   if(!admissionSemester){
    throw new Error('admissionSemester not found');
   }
    //set manually generated it
    userData.id = await generateStudentId(admissionSemester);

    //create a user
    const newUsr= await User.create(userData);
    //create a student
    if(Object.keys(newUsr).length){
        //set id,_id as user
        payload.id = newUsr.id; //embeding id
        payload.user = newUsr._id;//reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
    }
   

}
export const UserService={
    createStudentIntoDB 
}