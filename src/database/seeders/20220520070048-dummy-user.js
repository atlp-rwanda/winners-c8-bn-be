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
          {
            id: 2,
            name: "Jane Doe",
            email: "jane.doe@test.com",
            user_role: "requester",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: "Jacob Doe",
            email: "jacob.doe@test.com",
            user_role: "requester",
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
