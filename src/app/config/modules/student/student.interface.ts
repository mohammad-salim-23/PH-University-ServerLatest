import { Date, Model, Types } from "mongoose";


export type TUserName={
    firstName:string;
       lastName:string;
}
export type TGurdian={
    fatherName:string;
    fatherOccupation:string;
    fatherContactNo:string;
    motherName:string;
    motherOccupation:string;
    motherContactNo:string;

}
export type TLocalGuardian={
    name:string;
    occupation:string;
    contactNo:string;
    address:string;
}
export type TStudent={
    id:string;
    user:Types.ObjectId,//mongoose
    password:string;
    name:TUserName;
    gender: "male" | "female" | "other"; 
    dateOfBirth?:Date;
    email:string;
    avater?:string;
    contactNumber:string;
    emergencyContactNumber?:string;
    bloodGroup?:'A+'|'A-'|'B+'|'B-'|'AB+'|'AB-'|'O+'|'O-';
    presentAddress:string;
    permanentAddress:string;
    gurdian:TGurdian;
    localGuardian:TLocalGuardian;
    profiling?:string;
    isDeleted?:boolean;
}
/*for creating static*/
  
export interface StudentModel extends Model<TStudent> {
    isUserExists():Promise<TStudent | null>;
  }


/** for creating instance */
// export type StudentMethods = {
//     isUserExists(id:string): Promise<TStudent | null>;
// }

// Create a new Model type that knows about TStudentMethods...
// export type StudentModel = Model<TStudent, Record<string,never>, StudentMethods>;