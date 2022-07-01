'use strict';
const {
  Model
} = require('sequelize');
const { generateTimeForChat } = require('../../helpers/generateTimeForChat');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), id:undefined, updatedAt:undefined,
        createdAt: generateTimeForChat(this.createdAt)
      }
    }
  }
  Chat.init({
    message: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'chats',
    modelName: 'Chat',
  });
  return Chat;
};