"use strict";
/**
 * Defines all auth routes
 *
 */
exports.__esModule = true;
var express_1 = require("express");
var AuthController_1 = require("../../controllers/AuthController");
var router = express_1.Router();
router.post('/signup', AuthController_1["default"].signup);
router.post('/signin', AuthController_1["default"].signin);
exports["default"] = router;
