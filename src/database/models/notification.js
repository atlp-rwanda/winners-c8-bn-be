"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Notification.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      message: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      link: DataTypes.STRING,
      userId: { type: DataTypes.UUID, allowNull: false },
      status: {
        type: DataTypes.ENUM(["delivered", "read"]),
        allowNull: false,
        defaultValue: "delivered",
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
