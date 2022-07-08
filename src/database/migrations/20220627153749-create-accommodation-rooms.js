"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("accommodation_rooms", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      accommodation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bed_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: null,
      },
      images_links: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
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
    await queryInterface.dropTable("accommodation_rooms");
  },
};
