"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_sessions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
      },
      token: {
        type: Sequelize.STRING(1234),
      },
      loginIp: {
        type: Sequelize.STRING,
      },
      deviceType: {
        type: Sequelize.STRING,
      },
      lastActivity: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_sessions");
  },
};
