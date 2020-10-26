import User from './models/User';

declare namespace Express {
   export interface Request {
      user?: number
   }
}