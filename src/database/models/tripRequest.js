/* eslint-disable require-jsdoc */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TripRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: "owner",
      });
      this.belongsTo(models.User, {
        as: "manager",
      });
      this.belongsTo(models.Location, {
        as: "departure",
      });
      this.belongsToMany(models.Location, {
        as: "destinations",
        through: models.TripRequestDestination,
        foreignKey: "tripId",
      });
    }
  }
  TripRequest.init(
    {
      departureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      travel_reason: {
        type: DataTypes.STRING,
        allowNull: false,
        name: "Travel Reason",
      },
      accommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: "accommodations",
            modelName: "Accommodation",
          },
        },
      },
      dateOfDeparture: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        name: "Date of Departure",
      },
      dateOfReturn: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        name: "Date of return",
      },
      status: {
        type: DataTypes.ENUM(["pending", "approved", "denied"]),
        allowNull: false,
        defaultValue: "pending",
      },
      tripType: {
        type: DataTypes.ENUM(["return", "oneway"]),
        allowNull: false,
        name: "Trip type",
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      managerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "TripRequest",
      tableName: "trip_requests",
    }
  );
  return TripRequest;
};
