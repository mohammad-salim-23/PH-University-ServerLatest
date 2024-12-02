import { isDecimal } from "validator";
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
  const studentValidationSchema = z.object({
    id: z.string().min(1, { message: 'Student ID is required' }),
    password:z.string().max(20),
    name: userNameValidationSchema,
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
    gurdian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profiling: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted:z.boolean(),
  });
  export default studentValidationSchema;