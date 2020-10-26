import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../constants';

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

    return res.json({ success: false, error: { message: err.message } });
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