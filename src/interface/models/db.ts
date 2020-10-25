import { Sequelize, Model } from 'sequelize';
import { IUserAttributes, IUserCreationAttributes } from './user';
import { INotificationAttributes, INotificationCreationAttributes } from './notification';

export interface DbInterface {
  sequelize: Sequelize;
  User: Model<IUserAttributes, IUserCreationAttributes>;
  Notification: Model<INotificationAttributes, INotificationCreationAttributes>;
}