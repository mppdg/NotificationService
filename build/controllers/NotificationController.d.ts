import { IRequest, IResponse, INextFunction } from '../interface/api';
/**
 * Defines controllers for handling notification routes
 *
 */
declare class NotificationController {
    static getNotifications(req: IRequest, res: IResponse, next: INextFunction): Promise<any>;
    static getSubscriptions(req: IRequest, res: IResponse, next: INextFunction): Promise<any>;
    static subscribe(req: IRequest, res: IResponse, next: INextFunction): Promise<any>;
    static unsubscribe(req: IRequest, res: IResponse, next: INextFunction): Promise<any>;
    static publish(req: IRequest, res: IResponse, next: INextFunction): Promise<any>;
    static createTopic(req: IRequest, res: IResponse, next: INextFunction): any;
    static listTopics(req: IRequest, res: IResponse, next: INextFunction): any;
}
export default NotificationController;
