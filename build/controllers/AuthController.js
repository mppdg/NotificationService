"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Handler_1 = __importDefault(require("../utils/middleware/Handler"));
const Auth_1 = __importDefault(require("../utils/helpers/Auth"));
const constants_1 = require("../utils/constants");
const Api_1 = __importDefault(require("../utils/helpers/Api"));
/**
 * Define controllers for handling auth routes.
 *
 */
class AuthController {
    static signup(req, res, next) {
        const { firstName, lastName, email, password: hash } = req.body;
        User_1.default.findOrCreate({
            where: { email },
            defaults: { firstName, lastName, email, hash },
        })
            .then(([user, created]) => {
            if (!created)
                Handler_1.default.throw(res, 'Email already exist', constants_1.STATUS_CODE.CONFLICT);
            const payload = { id: user.id, email: user.email };
            const token = Auth_1.default.generateToken(payload, constants_1.TOKEN_EXPIRES_IN);
            const data = Object.assign(Object.assign({}, payload), { firstName, lastName, token });
            return res
                .status(constants_1.STATUS_CODE.CREATED)
                .json(Api_1.default.successResponse('Sign up successful', data));
        }).catch(next);
    }
    static signin(req, res, next) {
        const { password, email } = req.body;
        User_1.default.findOne({ where: { email } })
            .then(user => {
            if (!user)
                return Handler_1.default
                    .throw(res, 'Email or password not correct', constants_1.STATUS_CODE.BAD_REQUEST);
            const isMatch = user.comparePassword(password);
            if (!isMatch)
                return Handler_1.default
                    .throw(res, 'Email or password not correct', constants_1.STATUS_CODE.BAD_REQUEST);
            const payload = { id: user.id, email: user.email };
            const token = Auth_1.default.generateToken(payload, constants_1.TOKEN_EXPIRES_IN);
            const data = Object.assign(Object.assign({}, payload), { firstName: user.firstName, lastName: user.lastName, token });
            return res
                .status(constants_1.STATUS_CODE.OK)
                .json(Api_1.default.successResponse('Login successful', data));
        })
            .catch(next);
    }
}
exports.default = AuthController;
