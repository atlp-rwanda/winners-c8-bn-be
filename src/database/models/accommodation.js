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
      images_links: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      add_on_services: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue('add_on_services'));
        },
        set: function (add_on_services) {
            this.setDataValue('add_on_services', JSON.stringify(add_on_services));
        },
        allowNull: true,
      },
      amenities: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue('amenities'));
        },
        set: function (amenities) {
            this.setDataValue('amenities', JSON.stringify(amenities));
        },
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
