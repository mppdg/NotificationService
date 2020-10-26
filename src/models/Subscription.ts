import { Model, DataTypes, Sequelize } from "sequelize";
import { ISubscriptionAttributes, ISubscriptionCreationAttributes } from '../interface/models/subscription';


class Subscription extends Model<ISubscriptionAttributes, ISubscriptionCreationAttributes>
  implements ISubscriptionAttributes {
  public id!: string;
  public topic!: string;
  public topicArn!: string;
  public subscriberId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const subscriptionAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topicArn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscriberId: {
    type: DataTypes.UUID,
    allowNull: false
  }
};

export const subscriptionOptions = (sequelize: Sequelize) => ({
  tableName: "Subscriptions",
  sequelize,
})


export default Subscription;


