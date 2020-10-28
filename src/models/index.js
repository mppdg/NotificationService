"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var dotenv_1 = require("dotenv");
var User_1 = require("./User");
var Notification_1 = require("./Notification");
var Subscription_1 = require("./Subscription");
dotenv_1["default"].config();
var dbUrl = process.env.DATABASE_URL || '';
var sequelize = new sequelize_1.Sequelize(dbUrl);
var db = {
    sequelize: sequelize,
    User: User_1["default"].init(User_1.userAttributes, User_1.userOptions(sequelize)),
    Notification: Notification_1["default"].init(Notification_1.notificationAttributes, Notification_1.notificationOptions(sequelize)),
    Subscription: Subscription_1["default"].init(Subscription_1.subscriptionAttributes, Subscription_1.subscriptionOptions(sequelize))
};
/* Associations */
User_1["default"].hasMany(Notification_1["default"], {
    sourceKey: "id",
    foreignKey: "senderId",
    as: "notifications"
});
Notification_1["default"].belongsTo(User_1["default"], { as: "sender" });
exports["default"] = db;
