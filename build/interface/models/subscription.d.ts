import { Optional } from "sequelize";
export interface ISubscriptionAttributes {
    id: string;
    topic: string;
    topicArn: string;
    subscriberId: string;
}
export interface ISubscriptionCreationAttributes extends Optional<ISubscriptionAttributes, "id"> {
}
