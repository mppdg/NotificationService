"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationOptions = exports.notificationAttributes = void 0;
const sequelize_1 = require("sequelize");
class Notification extends sequelize_1.Model {
}
exports.notificationAttributes = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    topic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    topicArn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    senderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
};
exports.notificationOptions = (sequelize) => ({
    tableName: "Notifications",
    sequelize,
});
exports.default = Notification;
