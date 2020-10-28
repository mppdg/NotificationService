"use strict";
exports.__esModule = true;
var socket_io_1 = require("socket.io");
/**
 * Setup socketio for app use.
 *
 */
var SocketIO = /** @class */ (function () {
    function SocketIO() {
    }
    SocketIO.setup = function (server) {
        var io = socket_io_1["default"](server);
        var connection = io
            .of("io/socket/notifications")
            .on("connection", function (socket) { });
        return function (req, res, next) {
            req.io = connection;
            next();
        };
    };
    return SocketIO;
}());
exports["default"] = SocketIO;
