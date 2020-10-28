"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODE = exports.TOKEN_EXPIRES_IN = void 0;
exports.TOKEN_EXPIRES_IN = '3d';
exports.STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_ACTION: 405,
    CONFLICT: 409,
    VALIDATION_FAILED: 422,
    SERVER_ERROR: 500,
};
