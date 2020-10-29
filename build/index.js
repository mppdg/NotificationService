"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const models_1 = __importDefault(require("./models"));
const Handler_1 = __importDefault(require("./utils/middleware/Handler"));
const SocketIO_1 = __importDefault(require("./utils/middleware/SocketIO"));
models_1.default.sequelize.sync();
const app = express_1.default();
const server = new http_1.Server(app);
app.use(cors_1.default());
app.use(SocketIO_1.default.setup(server));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(routes_1.default);
app.use(Handler_1.default.errorResponse);
let port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0)
    port = 4000;
server.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
