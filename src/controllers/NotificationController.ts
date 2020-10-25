import { Request, Response, NextFunction } from 'express';

/**
 * Defines controllers for handling notification routes
 * 
 */

class NotificationController {

  public static getAll(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.end('get all notificaton')
  }

  public static subscribe(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.end('subscribe to a notificaton')
  }

  static unsubscribe(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

    res.end('unsubscribe from a notificaton')
  }

  static publish(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {
      res.end('publish a message')
  }

  static createTopic(
    req: Request,
    res: Response,
    next: NextFunction
    ): any {

      res.end('create notification preference or topic')
  }

}

export default NotificationController;
