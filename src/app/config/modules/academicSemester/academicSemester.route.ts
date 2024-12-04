import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controllers';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router =  express.Router();

// will call controller function

router.post('/create-academic-semester',
    validateRequest(
     AcademicSemesterValidations.createAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.createAcademicSemester)

export const AcademicSemesterRoutes = router;
