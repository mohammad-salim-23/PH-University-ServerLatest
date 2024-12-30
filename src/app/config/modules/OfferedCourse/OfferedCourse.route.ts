 import express  from "express"
import { OfferedCourseControllers } from "./OfferedCourse.controller";
import validateRequest from "../../../middleware/validateRequest";
import { OfferedCourseValidations } from "./OfferedCourse.validation";
const router = express.Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourse);
router.get('/:id', OfferedCourseControllers.getSingleofferedCouurse);
router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse,
)
router.patch('/:id', validateRequest( OfferedCourseValidations.updateOfferedCourseValidationSchema),
OfferedCourseControllers.updateOfferdcourse
)
router.delete('/:id',OfferedCourseControllers.deleteOfferedCourseFromDB);
export const OfferedRoutes = router;