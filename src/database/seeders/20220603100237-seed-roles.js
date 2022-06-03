'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // seeding roles of users

    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        uuid: "d9fdc991-30eb-461d-89e6-7ff5094a12cb",
        title: "super-admin",
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: 2,
        uuid: "688de00a-804f-46b7-8a6e-5d5e277b2692",
        title: "travel-admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        uuid: "61d284b9-36db-4dfe-8aac-1ca302a80704",
        title: "manager",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        uuid: "013dddd7-2769-4de6-8fc3-7aa527114879",
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
