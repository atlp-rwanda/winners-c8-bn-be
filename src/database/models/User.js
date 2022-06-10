/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull:true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      email_token: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull:true
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};




 