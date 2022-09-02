"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Notifications", "associatedUserId", {
      type: Sequelize.UUID,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Notifications", "associatedUserId");
  },
};
