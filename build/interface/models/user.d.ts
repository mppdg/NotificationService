import { Optional } from "sequelize";
export interface IUserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
}
export interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> {
}
