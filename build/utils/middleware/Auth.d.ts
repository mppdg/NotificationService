import { IRequest, IResponse, INextFunction } from '../../interface/api';
/**
 * Defines authentication middleware.
 *
 */
declare class Auth {
    static authenticate(req: IRequest, res: IResponse, next: INextFunction): any;
}
export default Auth;
