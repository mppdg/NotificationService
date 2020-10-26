import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';

export interface IRequest extends Request {
  user?: User
};

export interface IResponse extends Response {};

export interface INextFunction extends NextFunction {};

