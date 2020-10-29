"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOptions = exports.userAttributes = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    comparePassword(plainPassword) {
        return bcrypt_1.default.compareSync(plainPassword, this.hash);
    }
}
exports.userAttributes = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    hash: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
};
exports.userOptions = (sequelize) => ({
    tableName: "Users",
    sequelize,
    hooks: {
        beforeCreate: (user) => {
            user.hash = bcrypt_1.default.hashSync(user.hash, bcrypt_1.default.genSaltSync(10));
        },
    },
    defaultScope: {
        attributes: { exclude: ['hash'] },
    },
    scopes: {
        password: {
            attributes: { exclude: [] },
        },
    }
});
exports.default = User;
