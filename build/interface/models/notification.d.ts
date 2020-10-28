import { Optional } from "sequelize";
export interface INotificationAttributes {
    id: string;
    message: string;
    topic: string;
    topicArn: string;
    senderId: string;
}
export interface INotificationCreationAttributes extends Optional<INotificationAttributes, "id"> {
}
