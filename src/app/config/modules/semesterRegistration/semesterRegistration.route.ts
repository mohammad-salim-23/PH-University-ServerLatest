import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.post('/create-semester-registration',
    validateRequest(
        SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
);
router.get('/:id',
        SemesterRegistrationController.getSingleSemesterRegistrations,
)
router.get('/',SemesterRegistrationController.getAllSemesterRegistrations);
export const semesterRegistrationRoutes = router;