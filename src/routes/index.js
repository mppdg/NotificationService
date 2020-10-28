"use strict";
/**
 * Entry to all app routes
 *
 */
exports.__esModule = true;
var express_1 = require("express");
var swagger_ui_express_1 = require("swagger-ui-express");
var Handler_1 = require("../utils/middleware/Handler");
var api_1 = require("./api");
var swagger_docs_1 = require("../utils/swagger.docs");
var router = express_1.Router();
router.use('/api', api_1["default"]);
router.use('/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_docs_1["default"]));
router.use('/', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_docs_1["default"]));
router.use('/*', Handler_1["default"].pathNotFound);
exports["default"] = router;
