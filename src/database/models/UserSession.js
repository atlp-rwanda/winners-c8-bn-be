"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: { name: "userId", type: DataTypes.UUID },
      });
    }
  }
  UserSession.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: DataTypes.UUID,
      token: DataTypes.STRING,
      loginIp: DataTypes.STRING,
      deviceType: DataTypes.STRING,
      lastActivity: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserSession",
      tableName: "user_sessions",
    }
  );
  return UserSession;
};
