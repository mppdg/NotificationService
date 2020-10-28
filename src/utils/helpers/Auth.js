"use strict";
exports.__esModule = true;
var jwt = require('jsonwebtoken');
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.generateToken = function (payload, expiresIn) {
        return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: expiresIn });
    };
    Auth.verifyToken = function (token) {
        try {
            return jwt.verify(token, process.env.AUTH_SECRET);
        }
        catch (err) {
            return false;
        }
    };
    return Auth;
}());
exports["default"] = Auth;
