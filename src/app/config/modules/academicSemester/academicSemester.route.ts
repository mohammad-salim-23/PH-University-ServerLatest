import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controllers';

const router =  express.Router();

// will call controller function

router.post('/create-academic-semester',AcademicSemesterControllers.createAcademicSemester)
// router.get('/',StudentControllers.getAllStudents)
// router.get('/:studentId',StudentControllers.getSingleStudent);
// router.delete('/:studentId',StudentControllers.deleteStudent);
export const StudentRoutes = router;
