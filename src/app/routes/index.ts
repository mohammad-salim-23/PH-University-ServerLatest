import { Router } from "express";
import { UserRoutes } from "../config/modules/user/user.route";
import { StudentRoutes } from "../config/modules/student/student.route";
import { AcademicSemesterRoutes } from "../config/modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../config/modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../config/modules/academicDepartmentt/academicDepartment.route";
import { FacultyRoutes } from "../config/modules/Faculty/Faculty.route";

const router = Router();
const moduleRoutes=[
    {
        path:'/users',
        route:UserRoutes
    },
    {
        path:'/students',
        route:StudentRoutes,
},
{
    path:'/faculties',
    route:FacultyRoutes
},
    {
        path:'/academic-semesters',
        route:AcademicSemesterRoutes,
    },
    {
       path:'/academic-faculties',
       route:AcademicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes,
      },
]
moduleRoutes.forEach((route)=>router.use(route.path,route.route));
export default router;