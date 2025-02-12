import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router =  express.Router();


// will call controller function
router.post('/create-student',
       auth(USER_ROLE.admin),
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent);
router.post('/create-faculty',
    // auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    UserControllers.createFaculty
);
router.post('/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
)
export const UserRoutes = router;
