import { Model, DataTypes, Sequelize } from 'sequelize';
import { IUserAttributes, IUserCreationAttributes } from '../interface/models/user';
declare class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    comparePassword(plainPassword: string): boolean;
}
export declare const userAttributes: {
    id: {
        allowNull: boolean;
        primaryKey: boolean;
        type: DataTypes.AbstractDataTypeConstructor;
        defaultValue: DataTypes.AbstractDataTypeConstructor;
    };
    firstName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    lastName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    email: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
        unique: boolean;
        validate: {
            isEmail: boolean;
        };
    };
    hash: {
        type: DataTypes.TextDataTypeConstructor;
        allowNull: boolean;
    };
};
export declare const userOptions: (sequelize: Sequelize) => {
    tableName: string;
    sequelize: Sequelize;
    hooks: {
        beforeCreate: (user: User) => void;
    };
    defaultScope: {
        attributes: {
            exclude: string[];
        };
    };
};
export default User;
