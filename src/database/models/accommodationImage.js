"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccommodationImage extends Model {
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
  AccommodationImage.init(
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
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "AccommodationImage",
      tableName: "accommodation_images",
    }
  );
  return AccommodationImage;
};
