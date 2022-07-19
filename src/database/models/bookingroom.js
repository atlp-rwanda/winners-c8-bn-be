'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingRoom extends Model {
   
    static associate(models) {
     this.belongsTo(models.User, {foreignKey:'userId', onDelete:'CASCADE', onUpdate:'CASCADE'});
     this.belongsTo(models.AccommodationRoom, {foreignKey:'roomId', onDelete:'CASCADE', onUpdate:'CASCADE'})

    }
  }
  BookingRoom.init({
    roomId: DataTypes.STRING,
    from:DataTypes.DATE,
    to: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'booked',
    modelName: 'BookingRoom',
  });
  return BookingRoom;
};