'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TripRequestDestination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Location, {
        foreignKey: "id",
      });
        this.hasMany(models.TripRequest, {
          foreignKey: "id",
        });
      
      // define association here
    }
  }
TripRequestDestination.init({
    destinationId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TripRequestDestination',
  });
  return TripRequestDestination;
};