import AWS from 'aws-sdk';
import { IRequest, IResponse, INextFunction } from '../interface/api';
import Notification from '../models/Notification';
import Subscription from '../models/Subscription';
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
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): any {

    res.end('get all notificaton')
  }

  public static async subscribe(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): Promise<any> {

    const { topicName } = req.body;
    const { user = { id: '', email: '' } } = req;
    const topic = topicName.toUpperCase();
    const topicArn = `${SNS_ARN}:${topic}`;

    const params = {
      Protocol: 'EMAIL',
      TopicArn: topicArn,
      Endpoint: user.email,
    };
    try {
      const [subscription, created] = await Subscription
        .findOrCreate({
          where: { topicArn, subscriber_id: user.id },
          defaults: { topic, topicArn, subscriber_id: user.id },
        });
      if (!created) return Handler
        .throw(res, `You're already subscribed to '${topic}'`, STATUS_CODE.CONFLICT);

      const data = await new AWS.SNS({ apiVersion: API_VERSION }).subscribe(params).promise();
      return res
        .status(201)
        .json(Api.successResponse(
          "Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox",
          { subscription: data.SubscriptionArn }
        ))

    } catch (error) {
      next(error);
    }
  }

  static unsubscribe(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): any {

    res.end('unsubscribe from a notificaton')
  }

  static publish(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): any {
    res.end('publish a message')
  }

  static createTopic(
    req: IRequest,
    res: IResponse,
    next: INextFunction
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
    req: IRequest,
    res: IResponse,
    next: INextFunction
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
