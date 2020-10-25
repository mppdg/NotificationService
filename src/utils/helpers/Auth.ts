const jwt = require('jsonwebtoken');

/**
 * Defines helper methods for authentication.
 * 
 */

interface TokenPayload {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

class Auth {

  public static generateToken(payload: TokenPayload, expiresIn: string) {
    return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn });
  }

  public static verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.AUTH_SECRET);
    } catch (err) {
      return false;
    }
  }
}

export default Auth;