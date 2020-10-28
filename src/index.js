"use strict";
exports.__esModule = true;
var express_1 = require("express");
var http_1 = require("http");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var routes_1 = require("./routes");
var models_1 = require("./models");
var Handler_1 = require("./utils/middleware/Handler");
var SocketIO_1 = require("./utils/middleware/SocketIO");
dotenv_1["default"].config();
models_1["default"].sequelize.sync();
var app = express_1["default"]();
var server = new http_1.Server(app);
app.use(SocketIO_1["default"].setup(server));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(routes_1["default"]);
app.use(Handler_1["default"].errorResponse);
var port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0)
    port = 4000;
server.listen(port, function () {
    console.log("Server is running on PORT: " + port);
});
