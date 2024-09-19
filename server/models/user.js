import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const User = (sequelize) => {
  const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Hash password before saving user
  UserModel.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return UserModel;
};

export default User;