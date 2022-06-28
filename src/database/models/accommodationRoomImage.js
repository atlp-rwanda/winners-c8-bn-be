"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccommodationRoomImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AccommodationRoom, {
        foreignKey: { name: "room_id", type: DataTypes.INTEGER },
      });
    }
  }
  AccommodationRoomImage.init(
    {
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "aaccommodation_rooms",
            modelName: "AccommodationRoom",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "AccommodationRoomImage",
      tableName: "accommodation_room_images",
    }
  );
  return AccommodationRoomImage;
};
