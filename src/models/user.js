const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKeyConstraint: true,
      });
      User.hasMany(models.Trip, {
        foreignKey: 'user_id',
        as: 'requester',
      });

      User.hasMany(models.User, {
        foreignKey: 'lineManager',
        as: 'manager',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      officeAddres: {
        type: DataTypes.STRING,
      },
      preferedLanguage: {
        type: DataTypes.STRING,
      },
      lineManager: {
        type: DataTypes.INTEGER,
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: '4',
      },
      googleId: {
        type: DataTypes.STRING,
      },
      facebookId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
