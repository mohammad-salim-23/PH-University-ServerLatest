/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StudentRoutes } from './app/config/modules/student/student.route';
import { UserRoutes } from './app/config/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send({ value: a }); // Send as a JSON object
});
//global error handler
app.use(globalErrorHandler)
//Not Found
app.use(notFound)
export default app;
