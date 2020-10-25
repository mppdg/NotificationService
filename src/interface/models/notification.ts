import { Optional } from "sequelize";

export interface INotificationAttributes {
  id: string;
  message: string;
  topic: string,
  topicArn: string,
  sender_id: string,
}
export interface INotificationCreationAttributes 
  extends Optional<INotificationAttributes, "id"> {}
