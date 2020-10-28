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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var aws_sdk_1 = require("aws-sdk");
var Notification_1 = require("../models/Notification");
var Subscription_1 = require("../models/Subscription");
var Handler_1 = require("../utils/middleware/Handler");
var constants_1 = require("../utils/constants");
var Api_1 = require("../utils/helpers/Api");
var SNS_ARN = process.env.AWS_SNS_ARN;
var API_VERSION = '2010-03-31';
/**
 * Defines controllers for handling notification routes
 *
 */
var NotificationController = /** @class */ (function () {
    function NotificationController() {
    }
    NotificationController.getNotifications = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, subs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.user, user = _a === void 0 ? { id: '' } : _a;
                        return [4 /*yield*/, Subscription_1["default"].findAll({
                                where: { subscriberId: user.id },
                                attributes: ['topicArn']
                            })];
                    case 1:
                        subs = _b.sent();
                        Notification_1["default"].findAll({
                            where: { topicArn: subs.map(function (sub) { return sub.topicArn; }) },
                            include: [Notification_1["default"].associations.sender]
                        }).then(function (notifications) {
                            return res.status(constants_1.STATUS_CODE.OK)
                                .json(Api_1["default"].successResponse("Success", notifications));
                        })["catch"](next);
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationController.getSubscriptions = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, subs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.user, user = _a === void 0 ? { id: '' } : _a;
                        return [4 /*yield*/, Subscription_1["default"].findAll({
                                where: { subscriberId: user.id }
                            })];
                    case 1:
                        subs = _b.sent();
                        return [2 /*return*/, res.status(constants_1.STATUS_CODE.OK)
                                .json(Api_1["default"].successResponse("Success", subs))];
                }
            });
        });
    };
    NotificationController.subscribe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var topicName, _a, user, topic, topicArn, params, _b, subscription, created, data, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        topicName = req.body.topicName;
                        _a = req.user, user = _a === void 0 ? { id: '', email: '' } : _a;
                        topic = topicName.toUpperCase();
                        topicArn = SNS_ARN + ":" + topic;
                        params = {
                            Protocol: 'EMAIL',
                            TopicArn: topicArn,
                            Endpoint: user.email
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Subscription_1["default"]
                                .findOrCreate({
                                where: { topicArn: topicArn, subscriberId: user.id },
                                defaults: { topic: topic, topicArn: topicArn, subscriberId: user.id }
                            })];
                    case 2:
                        _b = _c.sent(), subscription = _b[0], created = _b[1];
                        if (!created)
                            return [2 /*return*/, Handler_1["default"]["throw"](res, "You're already subscribed to '" + topic + "'", constants_1.STATUS_CODE.CONFLICT)];
                        return [4 /*yield*/, new aws_sdk_1["default"].SNS({ apiVersion: API_VERSION }).subscribe(params).promise()];
                    case 3:
                        data = _c.sent();
                        return [2 /*return*/, res
                                .status(constants_1.STATUS_CODE.CREATED)
                                .json(Api_1["default"].successResponse("Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox", { subscription: data.SubscriptionArn }))];
                    case 4:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NotificationController.unsubscribe = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var topicName, _b, user, topic, topicArn, data, subscription, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        topicName = req.body.topicName;
                        _b = req.user, user = _b === void 0 ? { id: '', email: '' } : _b;
                        topic = topicName.toUpperCase();
                        topicArn = SNS_ARN + ":" + topic;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, new aws_sdk_1["default"].SNS({ apiVersion: API_VERSION })
                                .listSubscriptionsByTopic({ TopicArn: topicArn }).promise()];
                    case 2:
                        data = _c.sent();
                        subscription = (_a = data.Subscriptions) === null || _a === void 0 ? void 0 : _a.find(function (sub) { return sub.Endpoint === user.email; });
                        if (!subscription)
                            return [2 /*return*/, Handler_1["default"]["throw"](res, "It seems you are not subscribed to '" + topic + "'. Unsubscription not neccessary", constants_1.STATUS_CODE.NOT_FOUND)];
                        if (subscription.SubscriptionArn === 'PendingConfirmation')
                            return [2 /*return*/, Handler_1["default"]["throw"](res, "Your subcription to '" + topic + "' is pending confirmation. Unsubscription not neccessary", constants_1.STATUS_CODE.NOT_FOUND)];
                        Subscription_1["default"].destroy({ where: { topicArn: topicArn, subscriberId: user.id } })["catch"]();
                        return [4 /*yield*/, new aws_sdk_1["default"].SNS({ apiVersion: API_VERSION })
                                .unsubscribe({ SubscriptionArn: subscription.SubscriptionArn || '' }).promise()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, res
                                .status(constants_1.STATUS_CODE.OK)
                                .json(Api_1["default"].successResponse("You have unsubscribed from '" + topic + "'", {}))];
                    case 4:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NotificationController.publish = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, _b, topicName, message, topic, topicArn, params, result, id, record, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.user, user = _a === void 0 ? { id: '', email: '', firstName: '', lastName: '' } : _a;
                        _b = req.body, topicName = _b.topicName, message = _b.message;
                        topic = topicName.toUpperCase();
                        topicArn = SNS_ARN + ":" + topic;
                        params = {
                            Message: message,
                            TopicArn: topicArn
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        // Check if topic exist
                        return [4 /*yield*/, new aws_sdk_1["default"].SNS({ apiVersion: API_VERSION })
                                .getTopicAttributes({ TopicArn: topicArn })
                                .promise()];
                    case 2:
                        // Check if topic exist
                        _c.sent();
                        return [4 /*yield*/, new aws_sdk_1["default"].SNS({ apiVersion: API_VERSION })
                                .publish(params)
                                .promise()];
                    case 3:
                        result = _c.sent();
                        id = user.id;
                        return [4 /*yield*/, Notification_1["default"].create({ message: message, topic: topic, topicArn: topicArn, senderId: id })];
                    case 4:
                        record = _c.sent();
                        if (!record)
                            Handler_1["default"]["throw"](res, 'Message could not saved', constants_1.STATUS_CODE.SERVER_ERROR);
                        // Send real time notification to all subscriber
                        if (req.io) {
                            req.io.emit("receive-message:" + topic, JSON.stringify(record));
                        }
                        // Send response
                        return [2 /*return*/, res.status(constants_1.STATUS_CODE.OK).json({
                                success: true,
                                message: "Message sent to '" + topic + "' subscribers"
                            })];
                    case 5:
                        error_3 = _c.sent();
                        if (error_3.message === 'Topic does not exist') {
                            res.status(404);
                        }
                        next(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NotificationController.createTopic = function (req, res, next) {
        var topicName = req.body.topicName;
        var topic = topicName.toUpperCase();
        var createTopicPromise = new aws_sdk_1["default"]
            .SNS({ apiVersion: API_VERSION })
            .createTopic({ Name: topic })
            .promise();
        createTopicPromise
            .then(function (data) {
            return res
                .status(constants_1.STATUS_CODE.CREATED)
                .json(Api_1["default"].successResponse(undefined, { topicArn: data.TopicArn }));
        })["catch"](next);
    };
    NotificationController.listTopics = function (req, res, next) {
        var listTopicsPromise = new aws_sdk_1["default"]
            .SNS({ apiVersion: API_VERSION })
            .listTopics({})
            .promise();
        listTopicsPromise
            .then(function (data) {
            if (!data)
                return Handler_1["default"]["throw"](res, 'An error occured', constants_1.STATUS_CODE.NOT_FOUND);
            var topics = data.Topics.map(function (item) { return ({
                topicArn: item.TopicArn,
                topicName: item.TopicArn.split(':').slice(-1)[0]
            }); });
            return res
                .status(constants_1.STATUS_CODE.OK)
                .json(Api_1["default"].successResponse(undefined, topics));
        })["catch"](next);
    };
    return NotificationController;
}());
exports["default"] = NotificationController;
