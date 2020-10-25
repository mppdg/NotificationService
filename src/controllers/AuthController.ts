import { Request, Response, NextFunction } from 'express';
import Handler from '../utils/middleware/Handler';
import Auth from '../utils/helpers/Auth';
import { TOKEN_EXPIRES_IN } from '../utils/constants';
import User from '../models/User';

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

    const {
      firstName,
      lastName,
      email,
      password: hash
    } = req.body;

    User.findOrCreate({
      where: { email },
      defaults: { firstName, lastName, email, hash },
    })
      .then(([user, created]) => {
        if (!created) Handler.throw(res, 'Email already exist', 409);
        const payload = { id: user.id, email: user.email }
        const token = Auth.generateToken(payload, TOKEN_EXPIRES_IN);
        res.status(201).json({
          data: {
            ...payload,
            firstName: user.firstName,
            lastName: user.lastName,
            token
          },
          message: 'Sign up successful',
          success: true
        });

      }).catch(next);
  }
  
  public static signin(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.end('login into your account');
  }
}

export default AuthController;
