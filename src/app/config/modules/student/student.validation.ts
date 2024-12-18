
import { z } from "zod";
const userNameValidationSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: 'First name is required' })
      .max(20, { message: 'First name cannot be more than 20 characters' })
      .refine(
        (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
        { message: 'First name must be capitalized' }
      ),
    lastName: z
      .string()
      .min(1, { message: 'Last name is required' })
      .refine((value) => /^[A-Za-z]+$/.test(value), {
        message: 'Last name must contain only alphabetic characters',
      }),
  });
  
  // Guardian Schema
  const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: 'Father name is required' }),
    fatherOccupation: z.string().min(1, { message: 'Father occupation is required' }),
    fatherContactNo: z.string().min(1, { message: 'Father contact number is required' }),
    motherName: z.string().min(1, { message: 'Mother name is required' }),
    motherOccupation: z.string().min(1, { message: 'Mother occupation is required' }),
    motherContactNo: z.string().min(1, { message: 'Mother contact number is required' }),
  });
  
  // Local Guardian Schema
  const localGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: 'Local guardian name is required' }),
    occupation: z.string().min(1, { message: 'Local guardian occupation is required' }),
    contactNo: z.string().min(1, { message: 'Local guardian contact number is required' }),
    address: z.string().min(1, { message: 'Local guardian address is required' }),
  });
  
  // Main Student Schema
 export const createStudentValidationSchema = z.object({
    body:z.object({
      password:z.string().max(20),
      student:z.object({   name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      avater: z.string().optional(),
      contactNumber: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNumber: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, { message: 'Present address is required' }),
      permanentAddress: z.string().min(1, { message: 'Permanent address is required' }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester:z.string(),
      profiling: z.string().optional()})
      
    })
  })
  const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  });
  
  const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
  });
  
  const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
  });
  
   export const updateStudentValidationSchema = z.object({
    body: z.object({
      student: z.object({
        name: updateUserNameValidationSchema,
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloogGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        admissionSemester: z.string().optional(),
        profileImg: z.string().optional(),
        academicDepartment: z.string().optional(),
      }),
    }),
  });
  export const studentValidations={
    createStudentValidationSchema,updateStudentValidationSchema
  }
