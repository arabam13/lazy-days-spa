import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import { expressjwt } from 'express-jwt';

import { User as UserType } from '../../shared/types.js';
import { createAppointments } from './db-func/appointmentUtils.js';
import { validateUser } from './middlewares/index.js';
import appointmentRoutes from './route-methods/appointment.js';
import staffRoutes from './route-methods/staff.js';
import treatmentRoutes from './route-methods/treatment.js';
import userRoutes from './route-methods/user.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET must be defined in .env\nEXITING.');
  process.exit(-1);
}

// typing for Express request with jwt
declare global {
  namespace Express {
    interface Request {
      auth?: UserType;
    }
  }
}

const app = express();

// CORS for react app, assuming port 3000
// const corsOptions = {
//   origin: 'http://127.0.0.1:3000',
//   credentials: true,
//   allowedHeaders: ['sessionId', 'Content-Type'],
//   exposedHeaders: ['sessionId'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
// };
app.use(cors());

/* ********* middlewares ********* */
// use middleware to serve static images
app.use(express.static('public'));

// middleware for parsing json body
app.use(json());

app.use(
  '/user/:id',
  expressjwt({
    secret: process.env.JWT_SECRET as string,
    requestProperty: 'auth',
    algorithms: ['HS256'],
  })
);
app.use('/user/:id', validateUser);

// note: should really validate user for editing appointments
// I'm lazy and not implementing this. Spa managers beware!

/* *********** routes ********* */

// verify login
app.post('/signin', userRoutes.auth);

// user profile protected by jwt
app.get('/user/:id', userRoutes.get);
app.get('/user/:id/appointments', userRoutes.getUserAppointments);
app.delete('/user/:id', userRoutes.remove);
app.patch('/user/:id', userRoutes.update);

// adding user
app.post('/user', userRoutes.create);

app.get('/appointments/:year/:month', appointmentRoutes.get);
app.patch('/appointment/:id', appointmentRoutes.update);

app.get('/treatments', treatmentRoutes.get);
app.get('/staff', staffRoutes.get);
/* *********** END: routes ********* */

export const startUp = async () => {
  // create appointments relevant to current date
  await createAppointments();

  app.listen(3030, () => console.log('Spa server listening on port 3030!'));
};

startUp();

export default app;
