import { Request, Response, NextFunction } from 'express';

/**
 * Define controllers for handling auth routes.
 * 
 */

class AuthController {

  public static signup(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.end('signup an account')
  }
  
  public static signin(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.end('login into your account')
  }
}

export default AuthController;
