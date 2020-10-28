"use strict";
exports.__esModule = true;
var Auth_1 = require("../helpers/Auth");
var Handler_1 = require("./Handler");
var constants_1 = require("../constants");
var User_1 = require("../../models/User");
/**
 * Defines authentication middleware.
 *
 */
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.authenticate = function (req, res, next) {
        var decoded;
        try {
            var bearerToken = req.headers.authorization;
            if (bearerToken)
                decoded = Auth_1["default"].verifyToken(bearerToken.split(' ')[1]);
            if (!decoded)
                return Handler_1["default"]["throw"](res, 'Authentication failed', constants_1.STATUS_CODE.UNAUTHORIZED);
        }
        catch (error) {
            next(error);
        }
        var email = decoded.email;
        User_1["default"].findOne({ where: { email: email } })
            .then(function (user) {
            if (!user)
                return Handler_1["default"]["throw"](res, 'Authentication failed', constants_1.STATUS_CODE.UNAUTHORIZED);
            req.user = user;
            next();
        })["catch"](next);
    };
    return Auth;
}());
exports["default"] = Auth;
