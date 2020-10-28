"use strict";
/**
 * Entry to all app routes
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Handler_1 = __importDefault(require("../utils/middleware/Handler"));
const api_1 = __importDefault(require("./api"));
const swagger_docs_1 = __importDefault(require("../utils/swagger.docs"));
const router = express_1.Router();
router.use('/api', api_1.default);
router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_docs_1.default));
router.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_docs_1.default));
router.use('/*', Handler_1.default.pathNotFound);
exports.default = router;
