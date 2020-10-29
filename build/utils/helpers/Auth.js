"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
class Auth {
    static generateToken(payload, expiresIn) {
        return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn });
    }
    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.AUTH_SECRET);
        }
        catch (err) {
            return false;
        }
    }
}
exports.default = Auth;
