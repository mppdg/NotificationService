import { Request, Response, NextFunction } from 'express';

/**
 * Defines authentication middleware.
 * 
 */

class Auth {

  public static pathNotFound(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.status(404);
    next(new Error(`Path '${req.originalUrl}' not found`));
  }

}

export default Auth;