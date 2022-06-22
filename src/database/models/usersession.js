"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userSession.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
      loginIp: DataTypes.STRING,
      deviceType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userSession",
      tableName: "user_sessions",
    }
  );
  return userSession;
};
