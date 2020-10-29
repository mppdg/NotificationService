"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("../helpers/Auth"));
const Handler_1 = __importDefault(require("./Handler"));
const constants_1 = require("../constants");
const User_1 = __importDefault(require("../../models/User"));
/**
 * Defines authentication middleware.
 *
 */
class Auth {
    static authenticate(req, res, next) {
        let decoded;
        try {
            const bearerToken = req.headers.authorization;
            if (bearerToken)
                decoded = Auth_1.default.verifyToken(bearerToken.split(' ')[1]);
            if (!decoded)
                return Handler_1.default
                    .throw(res, 'Authentication failed', constants_1.STATUS_CODE.UNAUTHORIZED);
        }
        catch (error) {
            next(error);
        }
        const { email } = decoded;
        User_1.default.findOne({ where: { email } })
            .then(user => {
            if (!user)
                return Handler_1.default
                    .throw(res, 'Authentication failed', constants_1.STATUS_CODE.UNAUTHORIZED);
            req.user = user;
            next();
        })
            .catch(next);
    }
}
exports.default = Auth;
