import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User, { userAttributes, userOptions } from './User';
import Notification, { notificationAttributes, notificationOptions } from './Notification';
import { DbInterface } from '../interface/models/db';

dotenv.config();

const dbUrl = process.env.DATABASE_URL || '';
const sequelize = new Sequelize(dbUrl);

const db: DbInterface = {
  sequelize,
  User: User.init(userAttributes, userOptions(sequelize)),
  Notification: Notification.init(notificationAttributes, notificationOptions(sequelize)),
};

export default db;
