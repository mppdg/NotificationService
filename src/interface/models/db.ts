import { Sequelize, Model } from 'sequelize';
import { IUserAttributes, IUserCreationAttributes } from './user';
import { INotificationAttributes, INotificationCreationAttributes } from './notification';
import { ISubscriptionAttributes, ISubscriptionCreationAttributes } from './subscription';

export interface DbInterface {
  sequelize: Sequelize;
  User: Model<IUserAttributes, IUserCreationAttributes>;
  Notification: Model<INotificationAttributes, INotificationCreationAttributes>;
  Subscription: Model<ISubscriptionAttributes, ISubscriptionCreationAttributes>;
}