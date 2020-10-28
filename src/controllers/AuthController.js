"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var User_1 = require("../models/User");
var Handler_1 = require("../utils/middleware/Handler");
var Auth_1 = require("../utils/helpers/Auth");
var constants_1 = require("../utils/constants");
var Api_1 = require("../utils/helpers/Api");
/**
 * Define controllers for handling auth routes.
 *
 */
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.signup = function (req, res, next) {
        var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, hash = _a.password;
        User_1["default"].findOrCreate({
            where: { email: email },
            defaults: { firstName: firstName, lastName: lastName, email: email, hash: hash }
        })
            .then(function (_a) {
            var user = _a[0], created = _a[1];
            if (!created)
                Handler_1["default"]["throw"](res, 'Email already exist', constants_1.STATUS_CODE.CONFLICT);
            var payload = { id: user.id, email: user.email };
            var token = Auth_1["default"].generateToken(payload, constants_1.TOKEN_EXPIRES_IN);
            var data = __assign(__assign({}, payload), { firstName: firstName, lastName: lastName, token: token });
            return res
                .status(constants_1.STATUS_CODE.CREATED)
                .json(Api_1["default"].successResponse('Sign up successful', data));
        })["catch"](next);
    };
    AuthController.signin = function (req, res, next) {
        var _a = req.body, password = _a.password, email = _a.email;
        User_1["default"].scope('password').findOne({ where: { email: email } })
            .then(function (user) {
            if (!user)
                return Handler_1["default"]["throw"](res, 'Email or password not correct', constants_1.STATUS_CODE.BAD_REQUEST);
            var isMatch = user.comparePassword(password);
            if (!isMatch)
                return Handler_1["default"]["throw"](res, 'Email or password not correct', constants_1.STATUS_CODE.BAD_REQUEST);
            var payload = { id: user.id, email: user.email };
            var token = Auth_1["default"].generateToken(payload, constants_1.TOKEN_EXPIRES_IN);
            var data = __assign(__assign({}, payload), { firstName: user.firstName, lastName: user.lastName, token: token });
            return res
                .status(constants_1.STATUS_CODE.OK)
                .json(Api_1["default"].successResponse('Login successful', data));
        })["catch"](next);
    };
    return AuthController;
}());
exports["default"] = AuthController;
