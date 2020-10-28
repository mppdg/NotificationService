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
exports.userOptions = exports.userAttributes = void 0;
var bcrypt_1 = require("bcrypt");
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.comparePassword = function (plainPassword) {
        return bcrypt_1["default"].compareSync(plainPassword, this.hash);
    };
    return User;
}(sequelize_1.Model));
exports.userAttributes = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    hash: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
};
exports.userOptions = function (sequelize) { return ({
    tableName: "Users",
    sequelize: sequelize,
    hooks: {
        beforeCreate: function (user) {
            user.hash = bcrypt_1["default"].hashSync(user.hash, bcrypt_1["default"].genSaltSync(10));
        }
    },
    defaultScope: {
        attributes: { exclude: ['hash'] }
    },
    scopes: {
        password: {
            attributes: { exclude: [] }
        }
    }
}); };
exports["default"] = User;
