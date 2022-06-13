"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "users",
        [
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@test.com",
            user_role: "manager",
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