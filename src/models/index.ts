import { Sequelize } from 'sequelize';
import User, { userAttributes, userOptions } from './User';
import Notification, { notificationAttributes, notificationOptions } from './Notification';
import { DbInterface } from '../interface/models/db';

export const createModels = (): DbInterface => {
  const sequelize = new Sequelize('postgres://postgres:87654321@localhost:5432/assess');

  const db: DbInterface = {
    sequelize,
    User: User.init(userAttributes, userOptions(sequelize)),
    Notification: Notification.init(notificationAttributes, notificationOptions(sequelize)),
  };

  return db;
};