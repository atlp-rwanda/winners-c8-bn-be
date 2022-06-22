"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            id: Sequelize.UUIDV4,
            name: "John Doe",
            email: "john.doe@test.com",
            user_role: "manager",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: Sequelize.UUIDV4,
            name: "Jane Doe",
            email: "jane.doe@test.com",
            user_role: "requester",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: Sequelize.UUIDV4,
            firstName: "Jacob",
            lastName: "Doe",
            email: "jacob.doe@test.com",
            password: "password",
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
