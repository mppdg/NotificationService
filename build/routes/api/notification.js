"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines all notification routes
 *
 */
const express_1 = require("express");
const NotificationController_1 = __importDefault(require("../../controllers/NotificationController"));
const Auth_1 = __importDefault(require("../../utils/middleware/Auth"));
const router = express_1.Router();
router.get('/', Auth_1.default.authenticate, NotificationController_1.default.getNotifications);
router.get('/subscriptions', Auth_1.default.authenticate, NotificationController_1.default.getSubscriptions);
router.post('/subscribe', Auth_1.default.authenticate, NotificationController_1.default.subscribe);
router.delete('/unsubscribe', Auth_1.default.authenticate, NotificationController_1.default.unsubscribe);
router.post('/publish', Auth_1.default.authenticate, NotificationController_1.default.publish);
router.post('/topics', Auth_1.default.authenticate, NotificationController_1.default.createTopic);
router.get('/topics', Auth_1.default.authenticate, NotificationController_1.default.listTopics);
exports.default = router;
