"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // seeding super administrator
    try {
      await queryInterface.bulkInsert(
        "users",
        [
          {
            id: "013dddd7-2769-4de6-8fc3-7aa527114879",
            name: "nyakamwe aimable",
            email: "admin@test.com",
            password: "12345",
            roleId: "013dddd7-2769-4de6-8fc3-7aa527114879",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
