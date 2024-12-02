import Joi from "joi";
const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    userNameValidationSchema: Joi.object({
      firstName: Joi.string().required().max(20),
      lastName: Joi.string().required().regex(/^[A-Za-z]+$/),
    }).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required(),
    avater: Joi.string().optional(),
    contactNumber: Joi.string().required(),
    emergencyContactNumber: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    gurdianValidationSchema: Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNo: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNo: Joi.string().required(),
    }).required(),
    localGuardianValidationSchema: Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      contactNo: Joi.string().required(),
      address: Joi.string().required(),
    }).required(),
    profiling: Joi.string().optional(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });
  export default studentValidationSchema 