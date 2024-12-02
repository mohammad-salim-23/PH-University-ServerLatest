import config from "../..";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async(password:string,studentData:TStudent)=>{

    //create a user object
    const userData:Partial<TUser>={};
    //if password is not given, use default password
    userData.password = password || (config.default_pass as string);
    //set student role
    userData.role='student';
   
    //set manually generated it
    userData.id = '2030100001'

    //create a user
    const newUsr= await User.create(userData);
    //create a student
    if(Object.keys(newUsr).length){
        //set id,_id as user
        studentData.id = newUsr.id; //embeding id
        studentData.user = newUsr._id;//reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
    }
   

}
export const UserService={
    createStudentIntoDB 
}