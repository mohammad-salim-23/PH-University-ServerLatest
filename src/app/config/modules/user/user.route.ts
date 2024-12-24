import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';

const router =  express.Router();


// will call controller function
router.post('/create-student',
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent);
router.post('/create-faculty',
    validateRequest(createFacultyValidationSchema),
    UserControllers.createFaculty
);
export const UserRoutes = router;
