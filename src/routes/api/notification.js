"use strict";
exports.__esModule = true;
/**
 * Defines all notification routes
 *
 */
var express_1 = require("express");
var NotificationController_1 = require("../../controllers/NotificationController");
var Auth_1 = require("../../utils/middleware/Auth");
var router = express_1.Router();
router.get('/', Auth_1["default"].authenticate, NotificationController_1["default"].getNotifications);
router.get('/subscriptions', Auth_1["default"].authenticate, NotificationController_1["default"].getSubscriptions);
router.post('/subscribe', Auth_1["default"].authenticate, NotificationController_1["default"].subscribe);
router["delete"]('/unsubscribe', Auth_1["default"].authenticate, NotificationController_1["default"].unsubscribe);
router.post('/publish', Auth_1["default"].authenticate, NotificationController_1["default"].publish);
router.post('/topics', Auth_1["default"].authenticate, NotificationController_1["default"].createTopic);
router.get('/topics', Auth_1["default"].authenticate, NotificationController_1["default"].listTopics);
exports["default"] = router;
