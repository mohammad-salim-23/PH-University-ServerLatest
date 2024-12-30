 import express  from "express"
import { OfferedCourseControllers } from "./OfferedCourse.controller";
import validateRequest from "../../../middleware/validateRequest";
import { OfferedCourseValidations } from "./OfferedCourse.validation";
const router = express.Router();

router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse,
)