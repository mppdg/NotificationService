import { Request, Response, NextFunction } from 'express';
import { Namespace } from 'socket.io';
import User from '../../models/User';
export interface IRequest extends Request {
    user?: User;
    io?: Namespace;
}
export interface IResponse extends Response {
}
export interface INextFunction extends NextFunction {
}
