"use strict";
/**
 * Defines helper methods for api.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Api {
    static successResponse(message, data) {
        return {
            success: true,
            message,
            data
        };
    }
}
exports.default = Api;
