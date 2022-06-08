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
      // define association here
    }
  }
  TripRequest.init(
    {
      departure: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 100],
        },
        name: "Departure",
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
        name: "Destination",
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
          model: Accommodation,
          key: "id",
        },
        name: "Accommodation",
      },
      dateOfDeparture: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        name: "Date of Departure",
        validate: {
          isBefore: DataTypes.NOW,
        },
      },
      dateOfReturn: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        name: "Date of return",
        validate: {
          isAfter: {
            args: this.dateOfDeparture,
            msg: "Should be after date of departure",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "approved", "denied"]],
        },
      },
      tripType: {
        type: DataTypes.STRING,
        allowNull: false,
        name: "Trip type",
        validate: {
          isIn: [["return", "oneway"]],
        },
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        name: "Request owner",
      },
      managerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        name: "Direct Manager",
      },
    },
    {
      sequelize,
      modelName: "TripRequest",
      tableName: "trip_requests",
    }
  );
  return TripRequest;
};
