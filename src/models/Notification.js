"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.notificationOptions = exports.notificationAttributes = void 0;
var sequelize_1 = require("sequelize");
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Notification;
}(sequelize_1.Model));
exports.notificationAttributes = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    topic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    topicArn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    senderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
};
exports.notificationOptions = function (sequelize) { return ({
    tableName: "Notifications",
    sequelize: sequelize
}); };
exports["default"] = Notification;
