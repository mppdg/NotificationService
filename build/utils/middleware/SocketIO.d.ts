/// <reference types="node" />
import { Server } from "http";
import { IRequest, IResponse, INextFunction } from "../../interface/api";
/**
 * Setup socketio for app use.
 *
 */
declare class SocketIO {
    static setup(server: Server): (req: IRequest, res: IResponse, next: INextFunction) => any;
}
export default SocketIO;
