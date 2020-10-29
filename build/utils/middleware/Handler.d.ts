import { Request, Response, NextFunction } from 'express';
/**
 * Defines error handlers middleware.
 *
 */
declare class Handler {
    static pathNotFound(req: Request, res: Response, next: NextFunction): any;
    static errorResponse(err: Error, req: Request, res: Response, next: NextFunction): any;
    static throw(res: Response, message: string, status: number): any;
}
export default Handler;
