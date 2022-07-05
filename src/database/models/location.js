"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      this.hasMany(models.TripRequest, {
        foreignKey: "departureId",
      });
      this.belongsToMany(models.TripRequest, {
        foreignKey: "destinationId",
        through: models.TripRequestDestination,
      });
    }
  }
  Location.init(
    {
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
