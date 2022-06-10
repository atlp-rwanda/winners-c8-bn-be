/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role}) {
      // define association here
      this.belongsTo(Role, {foreignKey:'user_role', as: 'role', onDelete:'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull:true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      email_token: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull:true
      },
      user_role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};




 