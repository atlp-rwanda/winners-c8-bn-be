/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserSession, {
        foreignKey: {
          name: "userId",
          type: DataTypes.UUID,
        },
        onDelete: "CASCADE",
      });

      this.hasMany(models.TripRequest, {
        foreignKey: "ownerId",
        foreignKey: "managerId",
      });

      this.belongsTo(models.Role, {
        foreignKey: "user_role",
        as: "role",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Chat, {
        foreignKey: "postedBy",
      });

      this.belongsToMany(models.Accommodation, {
        foreignKey: "userId",
        through: models.AccommodationLikes,
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_role: {
        type: DataTypes.UUID,
      },
      managerId: {
        type: DataTypes.UUID,
        defaultValue: null,
      },
      username: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      gender: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      department: DataTypes.STRING,
      googleId: {
        type: DataTypes.STRING,
      },
      facebookId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
