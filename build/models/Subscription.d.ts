import { Model, DataTypes, Sequelize } from "sequelize";
import { ISubscriptionAttributes, ISubscriptionCreationAttributes } from '../interface/models/subscription';
declare class Subscription extends Model<ISubscriptionAttributes, ISubscriptionCreationAttributes> implements ISubscriptionAttributes {
    id: string;
    topic: string;
    topicArn: string;
    subscriberId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare const subscriptionAttributes: {
    id: {
        allowNull: boolean;
        primaryKey: boolean;
        type: DataTypes.AbstractDataTypeConstructor;
        defaultValue: DataTypes.AbstractDataTypeConstructor;
    };
    topic: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    topicArn: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
    };
    subscriberId: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
    };
};
export declare const subscriptionOptions: (sequelize: Sequelize) => {
    tableName: string;
    sequelize: Sequelize;
};
export default Subscription;
