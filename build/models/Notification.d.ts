import { Model, DataTypes, Sequelize } from "sequelize";
import { INotificationAttributes, INotificationCreationAttributes } from '../interface/models/notification';
declare class Notification extends Model<INotificationAttributes, INotificationCreationAttributes> implements INotificationAttributes {
    id: string;
    message: string;
    topic: string;
    topicArn: string;
    senderId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare const notificationAttributes: {
    id: {
        allowNull: boolean;
        primaryKey: boolean;
        type: DataTypes.AbstractDataTypeConstructor;
        defaultValue: DataTypes.AbstractDataTypeConstructor;
    };
    message: {
        type: DataTypes.TextDataTypeConstructor;
        allowNull: boolean;
    };
    topic: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    topicArn: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    senderId: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
    };
};
export declare const notificationOptions: (sequelize: Sequelize) => {
    tableName: string;
    sequelize: Sequelize;
};
export default Notification;
