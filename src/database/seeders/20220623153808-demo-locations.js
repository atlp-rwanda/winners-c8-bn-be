"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Locations",
      [
        {
          id: 1,
          city: "Kigali City",
          state: null,
          province: "kigali",
          country: "Rwanda",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          city: "Nairobi City",
          state: null,
          province: "Nairobi",
          country: "Kenya",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          city: "Buffalo",
          state: "New York State",
          province: null,
          country: "United States of America",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /*
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
