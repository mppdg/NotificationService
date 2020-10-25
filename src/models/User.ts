import bcrypt from 'bcrypt';
import { Model, DataTypes, Sequelize } from 'sequelize';
import { IUserAttributes, IUserCreationAttributes } from '../interface/models/user';

class User extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public hash!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const userAttributes = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
};

export const userOptions = (sequelize: Sequelize) => ({
    tableName: "Users",
    sequelize,
    hooks: {
      beforeCreate: (user: User) => {
        user.hash = bcrypt.hashSync(user.hash, bcrypt.genSaltSync(10));
      },
    },
})



// User.init(
//   {
//     id: {
//       allowNull: false,
//       primaryKey: true,
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     hash: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "users",
//     sequelize,
//     hooks: {
//       beforeCreate: (user) => {
//         user.hash = bcrypt.hashSync(user.hash, bcrypt.genSaltSync(10));
//       },
//     },
//   }
// );

export default User;
