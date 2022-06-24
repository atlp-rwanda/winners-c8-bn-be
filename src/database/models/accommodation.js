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
  }
  Accommodation.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      country: DataTypes.STRING,
      rating: DataTypes.INTEGER,
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
