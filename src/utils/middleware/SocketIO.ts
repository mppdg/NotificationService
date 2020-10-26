import { Server } from "http";
import ioServer, { Socket } from "socket.io";
import { IRequest, IResponse, INextFunction } from "../../interface/api";

/**
 * Setup socketio for app use.
 *
 */

class SocketIO {
  public static setup(server: Server) {
    const io = ioServer(server);

    const connection = io
      .of("notifications/io")
      .on("connection", (socket: Socket) => { });

    return (
      req: IRequest,
      res: IResponse,
      next: INextFunction
    ): any => {
      req.io = connection;
      next();
    };
  }
}

export default SocketIO;
