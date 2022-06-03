'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // seeding roles of users

    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        title: "super-admin",
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: 2,
        title: "travel-admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "manager",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: "requester",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('roles', null, {});

  }
};
