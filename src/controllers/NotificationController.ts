import { Request, Response, NextFunction } from 'express';
const AWS = require('aws-sdk');
import Notification from '../models/Notification';
import Handler from '../utils/middleware/Handler';
import Auth from '../utils/helpers/Auth';
import { TOKEN_EXPIRES_IN, STATUS_CODE } from '../utils/constants';
import Api from '../utils/helpers/Api';

const SNS_ARN = process.env.AWS_SNS_ARN;
const API_VERSION = '2010-03-31';

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

    const { topicName } = req.body;
    const topic = topicName.toUpperCase();

    const createTopicPromise = new AWS
      .SNS({ apiVersion: API_VERSION })
      .createTopic({ Name: topic })
      .promise();

    createTopicPromise
      .then((data: any) => {
        return res
          .status(STATUS_CODE.CREATED)
          .json(Api.successResponse(undefined, {topicArn: data.TopicArn}))

      })
      .catch(next);
  }

}

export default NotificationController;
