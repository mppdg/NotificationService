import { Optional } from "sequelize";

export interface ISubscriptionAttributes {
  id: string;
  topic: string,
  topicArn: string,
  subscriber_id: string,
}
export interface ISubscriptionCreationAttributes
  extends Optional<ISubscriptionAttributes, "id"> { }
