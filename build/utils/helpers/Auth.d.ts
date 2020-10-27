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
declare class Auth {
    static generateToken(payload: TokenPayload, expiresIn: string): any;
    static verifyToken(token: string): any;
}
export default Auth;
