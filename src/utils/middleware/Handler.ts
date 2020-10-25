import { Request, Response, NextFunction } from 'express';

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

    res.status(404);
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
}

export default Handler;