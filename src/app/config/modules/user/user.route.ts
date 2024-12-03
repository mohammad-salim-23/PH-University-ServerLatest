import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

const router =  express.Router();

const shenaBahini=(name)=>{
return async (req:Request,res:Response,next:NextFunction)=>{
    console.log(`I am a ShenaBahini and my name is ${name}`);
    // next();
}
};
// will call controller function
router.post('/create-student',
    shenaBahini("validateRequest"),
    UserControllers.createStudent);

export const UserRoutes = router;
