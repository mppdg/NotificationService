import { Request, Response, NextFunction } from 'express';
const AWS = require('aws-sdk');
import Notification from '../models/Notification';
import Handler from '../utils/middleware/Handler';
import { STATUS_CODE } from '../utils/constants';
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

    const { topicName, email } = req.body;
    const topic = topicName.toUpperCase();
    // console.log('SNS_ARN###############', SNS_ARN)
    const params = {
      Protocol: 'EMAIL',
      TopicArn: `${SNS_ARN}:${topic}`,
      Endpoint: email
    };

    const subscribePromise = new AWS.SNS({ apiVersion: API_VERSION })
      .subscribe(params)
      .promise();

    // subscriptionStatus: "pending confirmation"
    subscribePromise.then((data: any) => {
      res.status(201).json(Api.successResponse(
        "Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox",
        { subscription: data.SubscriptionArn }
      ))
    }).catch(next);
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
          .json(Api.successResponse(undefined, { topicArn: data.TopicArn }))

      })
      .catch(next);
  }

  static listTopics(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {

    const listTopicsPromise = new AWS
      .SNS({ apiVersion: API_VERSION })
      .listTopics({})
      .promise();

    listTopicsPromise
      .then((data: any) => {

        if (!data) return Handler
          .throw(res, 'An error occured', STATUS_CODE.NOT_FOUND);

        const topics = data.Topics.map((item: any) => ({
          topicArn: item.TopicArn,
          topicName: item.TopicArn.split(':').slice(-1)[0]
        }))
        return res
          .status(STATUS_CODE.OK)
          .json(Api.successResponse(undefined, topics));

      })
      .catch(next);
  }

}

export default NotificationController;
