import { IRequest, IResponse, INextFunction } from '../../interface/api';
import AuthHelper from '../helpers/Auth';
import Handler from './Handler';
import { STATUS_CODE } from '../constants';
import User from '../../models/User';

/**
 * Defines authentication middleware.
 * 
 */

class Auth {

  public static authenticate(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): any {

    let decoded: any;
    try {
      const bearerToken = req.headers.authorization;
      if (bearerToken) decoded = AuthHelper.verifyToken(bearerToken.split(' ')[1]);
      if (!decoded) return Handler
        .throw(res, 'Authentication failed', STATUS_CODE.UNAUTHORIZED);
    } catch (error) {
      next(error);
    }

    const { email } = decoded;

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return Handler
          .throw(res, 'Authentication failed', STATUS_CODE.UNAUTHORIZED);
        req.user = user;
        next();
      })
      .catch(next);
  }
}

export default Auth;