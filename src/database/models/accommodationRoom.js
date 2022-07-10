"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccommodationRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Accommodation, {
        foreignKey: { name: "accommodation_id", type: DataTypes.INTEGER, onDelete: "cascade" },
      });
      this.hasMany(models.BookingRoom, {
        foreignKey:'roomId'
      });

    }
  }
  AccommodationRoom.init(
    {
      accommodation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "accommodations",
            modelName: "Accommodation",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      bed_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: null,
      },
      images_links: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      isBooked:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "AccommodationRoom",
      tableName: "accommodation_rooms",
    }
  );
  return AccommodationRoom;
};
