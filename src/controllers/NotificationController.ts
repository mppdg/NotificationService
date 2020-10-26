import AWS from 'aws-sdk';
import { IRequest, IResponse, INextFunction } from '../interface/api';
import Notification from '../models/Notification';
import Subscription from '../models/Subscription';
import User from '../models/User';
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

  public static async getNotifications(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): Promise<any> {

    const { user = { id: '' } } = req;

    const subs = await Subscription.findAll({
      where: { subscriberId: user.id },
      attributes: ['topicArn'],
    })


    Notification.findAll({
      where: { topicArn: subs.map(sub => sub.topicArn) },
      include: [Notification.associations.sender]
    }).then(notifications => {
      return res.status(STATUS_CODE.OK)
        .json(Api.successResponse("Success", notifications));
    }).catch(next)
  }

  public static async getSubscriptions(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): Promise<any> {

    const { user = { id: '' } } = req;

    const subs = await Subscription.findAll({
      where: { subscriberId: user.id },
    })

    return res.status(STATUS_CODE.OK)
      .json(Api.successResponse("Success", subs));

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
          where: { topicArn, subscriberId: user.id },
          defaults: { topic, topicArn, subscriberId: user.id },
        });
      if (!created) return Handler
        .throw(res, `You're already subscribed to '${topic}'`, STATUS_CODE.CONFLICT);

      const data = await new AWS.SNS({ apiVersion: API_VERSION }).subscribe(params).promise();
      return res
        .status(STATUS_CODE.CREATED)
        .json(Api.successResponse(
          "Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox",
          { subscription: data.SubscriptionArn }
        ))

    } catch (error) {
      next(error);
    }
  }


  static async unsubscribe(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): Promise<any> {

    const { topicName } = req.body;
    const { user = { id: '', email: '' } } = req;
    const topic = topicName.toUpperCase();
    const topicArn = `${SNS_ARN}:${topic}`;

    try {
      const data = await new AWS.SNS({ apiVersion: API_VERSION })
        .listSubscriptionsByTopic({ TopicArn: topicArn }).promise();
      const subscription = data.Subscriptions?.find(sub => sub.Endpoint === user.email);
      if (!subscription) return Handler.throw(
        res,
        `It seems you are not subscribed to '${topic}'. Unsubscription not neccessary`,
        STATUS_CODE.NOT_FOUND
      )

      if (subscription.SubscriptionArn === 'PendingConfirmation') return Handler.throw(
        res,
        `Your subcription to '${topic}' is pending confirmation. Unsubscription not neccessary`,
        STATUS_CODE.NOT_FOUND
      )

      Subscription.destroy({ where: { topicArn, subscriberId: user.id } }).catch();
      await new AWS.SNS({ apiVersion: API_VERSION })
        .unsubscribe({ SubscriptionArn: subscription.SubscriptionArn || '' }).promise();

      return res
        .status(STATUS_CODE.OK)
        .json(Api.successResponse(`You have unsubscribed from '${topic}'`, {}));
    } catch (error) {
      next(error)
    }
  }


  static async publish(
    req: IRequest,
    res: IResponse,
    next: INextFunction
  ): Promise<any> {
    const { user = { id: '', email: '', firstName: '', lastName: '' } } = req;
    const { topicName, message } = req.body;
    const topic = topicName.toUpperCase();

    const topicArn = `${SNS_ARN}:${topic}`;

    const params = {
      Message: message,
      TopicArn: topicArn
    };

    try {
      // Check if topic exist
      await new AWS.SNS({ apiVersion: API_VERSION })
        .getTopicAttributes({ TopicArn: topicArn })
        .promise();

      // Publish message
      const result = await new AWS.SNS({ apiVersion: API_VERSION })
        .publish(params)
        .promise();

      // Save message
      const { id: senderId } = user;
      const record = await Notification.create({ message, topic, topicArn, senderId });
      if (!record) Handler.throw(res, 'Message could not saved', STATUS_CODE.SERVER_ERROR);

      // Send response
      return res.status(STATUS_CODE.OK).json({
        success: true,
        message: `Message sent to '${topic}' subscribers`,
      })

    } catch (error) {
      if (error.message === 'Topic does not exist') {
        res.status(404);
      }
      next(error);
    }

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
