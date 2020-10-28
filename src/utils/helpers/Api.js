"use strict";
/**
 * Defines helper methods for api.
 *
 */
exports.__esModule = true;
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.successResponse = function (message, data) {
        return {
            success: true,
            message: message,
            data: data
        };
    };
    return Api;
}());
exports["default"] = Api;
