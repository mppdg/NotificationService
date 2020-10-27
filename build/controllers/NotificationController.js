"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Notification_1 = __importDefault(require("../models/Notification"));
const Subscription_1 = __importDefault(require("../models/Subscription"));
const Handler_1 = __importDefault(require("../utils/middleware/Handler"));
const constants_1 = require("../utils/constants");
const Api_1 = __importDefault(require("../utils/helpers/Api"));
const SNS_ARN = process.env.AWS_SNS_ARN;
const API_VERSION = '2010-03-31';
/**
 * Defines controllers for handling notification routes
 *
 */
class NotificationController {
    static getNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user = { id: '' } } = req;
            const subs = yield Subscription_1.default.findAll({
                where: { subscriberId: user.id },
                attributes: ['topicArn'],
            });
            Notification_1.default.findAll({
                where: { topicArn: subs.map(sub => sub.topicArn) },
                include: [Notification_1.default.associations.sender]
            }).then(notifications => {
                return res.status(constants_1.STATUS_CODE.OK)
                    .json(Api_1.default.successResponse("Success", notifications));
            }).catch(next);
        });
    }
    static getSubscriptions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user = { id: '' } } = req;
            const subs = yield Subscription_1.default.findAll({
                where: { subscriberId: user.id },
            });
            return res.status(constants_1.STATUS_CODE.OK)
                .json(Api_1.default.successResponse("Success", subs));
        });
    }
    static subscribe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const [subscription, created] = yield Subscription_1.default
                    .findOrCreate({
                    where: { topicArn, subscriberId: user.id },
                    defaults: { topic, topicArn, subscriberId: user.id },
                });
                if (!created)
                    return Handler_1.default
                        .throw(res, `You're already subscribed to '${topic}'`, constants_1.STATUS_CODE.CONFLICT);
                const data = yield new aws_sdk_1.default.SNS({ apiVersion: API_VERSION }).subscribe(params).promise();
                return res
                    .status(constants_1.STATUS_CODE.CREATED)
                    .json(Api_1.default.successResponse("Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox", { subscription: data.SubscriptionArn }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static unsubscribe(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { topicName } = req.body;
            const { user = { id: '', email: '' } } = req;
            const topic = topicName.toUpperCase();
            const topicArn = `${SNS_ARN}:${topic}`;
            try {
                const data = yield new aws_sdk_1.default.SNS({ apiVersion: API_VERSION })
                    .listSubscriptionsByTopic({ TopicArn: topicArn }).promise();
                const subscription = (_a = data.Subscriptions) === null || _a === void 0 ? void 0 : _a.find(sub => sub.Endpoint === user.email);
                if (!subscription)
                    return Handler_1.default.throw(res, `It seems you are not subscribed to '${topic}'. Unsubscription not neccessary`, constants_1.STATUS_CODE.NOT_FOUND);
                if (subscription.SubscriptionArn === 'PendingConfirmation')
                    return Handler_1.default.throw(res, `Your subcription to '${topic}' is pending confirmation. Unsubscription not neccessary`, constants_1.STATUS_CODE.NOT_FOUND);
                Subscription_1.default.destroy({ where: { topicArn, subscriberId: user.id } }).catch();
                yield new aws_sdk_1.default.SNS({ apiVersion: API_VERSION })
                    .unsubscribe({ SubscriptionArn: subscription.SubscriptionArn || '' }).promise();
                return res
                    .status(constants_1.STATUS_CODE.OK)
                    .json(Api_1.default.successResponse(`You have unsubscribed from '${topic}'`, {}));
            }
            catch (error) {
                next(error);
            }
        });
    }
    static publish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield new aws_sdk_1.default.SNS({ apiVersion: API_VERSION })
                    .getTopicAttributes({ TopicArn: topicArn })
                    .promise();
                // Publish message
                const result = yield new aws_sdk_1.default.SNS({ apiVersion: API_VERSION })
                    .publish(params)
                    .promise();
                // Save message
                const { id } = user;
                const record = yield Notification_1.default.create({ message, topic, topicArn, senderId: id });
                if (!record)
                    Handler_1.default.throw(res, 'Message could not saved', constants_1.STATUS_CODE.SERVER_ERROR);
                // Send real time notification to all subscriber
                if (req.io) {
                    req.io.emit(`receive-message:${topic}`, JSON.stringify(record));
                }
                // Send response
                return res.status(constants_1.STATUS_CODE.OK).json({
                    success: true,
                    message: `Message sent to '${topic}' subscribers`,
                });
            }
            catch (error) {
                if (error.message === 'Topic does not exist') {
                    res.status(404);
                }
                next(error);
            }
        });
    }
    static createTopic(req, res, next) {
        const { topicName } = req.body;
        const topic = topicName.toUpperCase();
        const createTopicPromise = new aws_sdk_1.default
            .SNS({ apiVersion: API_VERSION })
            .createTopic({ Name: topic })
            .promise();
        createTopicPromise
            .then((data) => {
            return res
                .status(constants_1.STATUS_CODE.CREATED)
                .json(Api_1.default.successResponse(undefined, { topicArn: data.TopicArn }));
        })
            .catch(next);
    }
    static listTopics(req, res, next) {
        const listTopicsPromise = new aws_sdk_1.default
            .SNS({ apiVersion: API_VERSION })
            .listTopics({})
            .promise();
        listTopicsPromise
            .then((data) => {
            if (!data)
                return Handler_1.default
                    .throw(res, 'An error occured', constants_1.STATUS_CODE.NOT_FOUND);
            const topics = data.Topics.map((item) => ({
                topicArn: item.TopicArn,
                topicName: item.TopicArn.split(':').slice(-1)[0]
            }));
            return res
                .status(constants_1.STATUS_CODE.OK)
                .json(Api_1.default.successResponse(undefined, topics));
        })
            .catch(next);
    }
}
exports.default = NotificationController;
