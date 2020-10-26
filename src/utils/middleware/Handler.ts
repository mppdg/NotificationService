import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../constants';


const isProduction = process.env.NODE_ENV === 'production';

/**
 * Defines error handlers middleware.
 * 
 */

class Handler {

  public static pathNotFound(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.status(STATUS_CODE.NOT_FOUND);
    next(new Error(`Path '${req.originalUrl}' not found`));
  }
  
  public static errorResponse(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
    ): any {
    const error = { message: err.message, stacktrace: !isProduction && err };
    return res.json({ error });
  }

  public static throw(
    res: Response,
    message: string,
    status: number
    ): any {

    res.status(status);
    throw new Error(message);
  }
}

export default Handler;