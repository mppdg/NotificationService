"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importStar(require("./User"));
const Notification_1 = __importStar(require("./Notification"));
const Subscription_1 = __importStar(require("./Subscription"));
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_URL || '';
const sequelize = new sequelize_1.Sequelize(dbUrl);
const db = {
    sequelize,
    User: User_1.default.init(User_1.userAttributes, User_1.userOptions(sequelize)),
    Notification: Notification_1.default.init(Notification_1.notificationAttributes, Notification_1.notificationOptions(sequelize)),
    Subscription: Subscription_1.default.init(Subscription_1.subscriptionAttributes, Subscription_1.subscriptionOptions(sequelize)),
};
/* Associations */
User_1.default.hasMany(Notification_1.default, {
    sourceKey: "id",
    foreignKey: "senderId",
    as: "notifications",
});
Notification_1.default.belongsTo(User_1.default, { as: "sender" });
exports.default = db;
