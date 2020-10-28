"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionOptions = exports.subscriptionAttributes = void 0;
const sequelize_1 = require("sequelize");
class Subscription extends sequelize_1.Model {
}
exports.subscriptionAttributes = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    topic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    topicArn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subscriberId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
};
exports.subscriptionOptions = (sequelize) => ({
    tableName: "Subscriptions",
    sequelize,
});
exports.default = Subscription;
