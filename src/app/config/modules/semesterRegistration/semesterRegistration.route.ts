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
//update route
router.patch(
    '/:id',
    validateRequest(
        SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.updateSemesterRegistration
);
router.get('/',SemesterRegistrationController.getAllSemesterRegistrations);
router.delete('/:id',
    SemesterRegistrationController.deleteSemesterRegistration
)
export const semesterRegistrationRoutes = router;