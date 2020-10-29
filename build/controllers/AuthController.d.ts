import { Request, Response, NextFunction } from 'express';
/**
 * Define controllers for handling auth routes.
 *
 */
declare class AuthController {
    static signup(req: Request, res: Response, next: NextFunction): any;
    static signin(req: Request, res: Response, next: NextFunction): any;
}
export default AuthController;
