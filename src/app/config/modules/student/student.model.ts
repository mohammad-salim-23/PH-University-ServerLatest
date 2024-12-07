import { model, Schema } from 'mongoose';
import validator from 'validator';
import {  StudentModel, TGurdian, TLocalGuardian, TStudent, TUserName } from './student.interface';




// UserName Schema
const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim:true,
        maxlength:[20,'First Name cannot be more than 20 characters'],
        //custom validator
        validate:{
            validator:function(value:string){
                const firstNameStr = value.charAt(0).toUpperCase()+value.slice(1);//Salim->ei format e takte hobe
                return firstNameStr === value;

            },
            message:'{VALUE} is not in capitalaize format'
        }
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim:true,
        validate:{
            validator:(value:string)=>validator.isAlpha(value),
            message:'{VALUE} is not valid'
        }
    },
});

// Guardian Schema
const guardianSchema = new Schema<TGurdian>({
    fatherName: {
        type: String,
        required: [true, 'Father name is required'],
        trim:true,
        
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father contact number is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother occupation is required'],
        trim:true,
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother contact number is required'],
    },
});

// Local Guardian Schema
const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local guardian name is required'],
    },
    occupation: {
        type: String,
        required: [true, 'Local guardian occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Local guardian contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Local guardian address is required'],
    },
});

// Student Schema
const studentSchema = new Schema<TStudent,StudentModel>({
    id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
    },
    user:{
        type:Schema.Types.ObjectId,
        required:[true, 'User ID is required'],
        unique:true,
        ref:'User',
    },

    name: {
        type: userNameSchema,
        required: [true, 'Student name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { 
        type: Date,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique:true,
        validate:{
            validator:(value:string)=>validator.isEmail(value),
            message:'{VALUE} is not a valid email type'
        }
    },
    avater: { 
        type: String, 
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    emergencyContactNumber: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    gurdian: {type:guardianSchema,
        required:[true,'gurdian information is required']
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required'],
    },
    profiling: {
        type: String,
    },
   admissionSemester:{
    type:Schema.Types.ObjectId,
    ref:'AcademicSemester',
   },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    toJSON:{
        virtuals:true
    }
});


//virtual
studentSchema.virtual('fullName').get(function(){
    return `${this.name.firstName} ${this.name.lastName}`
})


//query middleware
studentSchema.pre('find',function(next){
    this.find({isDeleted:{$ne:true}})
    next();
})
studentSchema.pre('findOne',function(next){
    this.find({isDeleted:{$ne:true}} );
    next();
})

studentSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
    next()
})
//creating a custom static method
studentSchema.statics.isUserExists = async function(id:string){
    const existingUser = await Student.findOne({id});

    return existingUser;
}

export const Student = model<TStudent,StudentModel>('Student', studentSchema);
