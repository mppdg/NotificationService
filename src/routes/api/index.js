"use strict";
/**
 * Entry to all API routes
 *
 */
exports.__esModule = true;
var express_1 = require("express");
var notification_1 = require("./notification");
var auth_1 = require("./auth");
var router = express_1["default"].Router();
router.use('/notifications', notification_1["default"]);
router.use('/auth', auth_1["default"]);
exports["default"] = router;
