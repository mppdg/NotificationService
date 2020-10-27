import { Method } from "aws-sdk/clients/cloudfront";
import { Model, DataTypes, Sequelize } from "sequelize";
import { INotificationAttributes, INotificationCreationAttributes } from '../interface/models/notification';


class Notification extends Model<INotificationAttributes, INotificationCreationAttributes>
  implements INotificationAttributes {
  public id!: string;
  public message!: string;
  public topic!: string;
  public topicArn!: string;
  public senderId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const notificationAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topicArn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false
  }
};

export const notificationOptions = (sequelize: Sequelize) => ({
  tableName: "Notifications",
  sequelize,
})


export default Notification;


