"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccommodationAddOnService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Accommodation, {
        foreignKey: { name: "accommodation_id", type: DataTypes.INTEGER },
      });
    }
  }
  AccommodationAddOnService.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "AccommodationAddOnService",
      tableName: "accommodation_add_on_services",
    }
  );
  return AccommodationAddOnService;
};
