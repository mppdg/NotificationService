"use strict";
exports.__esModule = true;
var constants_1 = require("../constants");
/**
 * Defines error handlers middleware.
 *
 */
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.pathNotFound = function (req, res, next) {
        res.status(constants_1.STATUS_CODE.NOT_FOUND);
        next(new Error("Path '" + req.originalUrl + "' not found"));
    };
    Handler.errorResponse = function (err, req, res, next) {
        if (res.statusCode < constants_1.STATUS_CODE.BAD_REQUEST)
            res.status(constants_1.STATUS_CODE.SERVER_ERROR);
        return res.json({ success: false, error: { message: err.message } });
    };
    Handler["throw"] = function (res, message, status) {
        res.status(status);
        throw new Error(message);
    };
    return Handler;
}());
exports["default"] = Handler;
