"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
/**
 * Defines error handlers middleware.
 *
 */
class Handler {
    static pathNotFound(req, res, next) {
        res.status(constants_1.STATUS_CODE.NOT_FOUND);
        next(new Error(`Path '${req.originalUrl}' not found`));
    }
    static errorResponse(err, req, res, next) {
        if (res.statusCode < constants_1.STATUS_CODE.BAD_REQUEST)
            res.status(constants_1.STATUS_CODE.SERVER_ERROR);
        return res.json({ success: false, error: { message: err.message } });
    }
    static throw(res, message, status) {
        res.status(status);
        throw new Error(message);
    }
}
exports.default = Handler;
