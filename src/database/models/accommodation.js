"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accommodation.hasMany(models.TripRequest, {
        foreignKey: "accommodationId",
        onDelete: "cascade",
      });
    }
    static associate(models) {
      this.belongsTo(models.Location, {
        foreignKey: { name: "location_id", type: DataTypes.INTEGER },
      });
    }
  }
  Accommodation.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Locations",
            modelName: "Location",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Accommodation",
      tableName: "accommodations",
    }
  );
  return Accommodation;
};
