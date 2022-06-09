"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "accommodations",
      [
        {
          id: 1,
          name: "Toronto Hotel",
          address: "capital street, Toronto, Ontario",
          country: "Canada",
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Reethi beach resort",
          address: "Reethi Beach, Fonimagoodhoo Island 20215",
          country: "Maldives",
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
