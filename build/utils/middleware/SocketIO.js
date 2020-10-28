"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
/**
 * Setup socketio for app use.
 *
 */
class SocketIO {
    static setup(server) {
        const io = socket_io_1.default(server);
        const connection = io
            .of("io/socket/notifications")
            .on("connection", (socket) => { });
        return (req, res, next) => {
            req.io = connection;
            next();
        };
    }
}
exports.default = SocketIO;
