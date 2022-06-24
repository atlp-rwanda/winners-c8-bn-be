"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // await queryInterface.bulkInsert(
      //   "Users",
      //   [
      //     {
      //       id: uuidv4(),
      //       firstName: "John",
      //       lastName: "Doe",
      //       email: "john.doe@test.com",
      //       password: "password",
      //       user_role: "manager",
      //       createdAt: new Date(),
      //       updatedAt: new Date(),
      //     },
      //     {
      //       id: uuidv4(),
      //       firstName: "Jane",
      //       lastName: "Doe",
      //       email: "jane.doe@test.com",
      //       password: "password",
      //       user_role: "requester",
      //       createdAt: new Date(),
      //       updatedAt: new Date(),
      //     },
      //     {
      //       id: uuidv4(),
      //       firstName: "Jacob",
      //       lastName: "Doe",
      //       email: "jacob.doe@test.com",
      //       password: "password",
      //       user_role: "requester",
      //       createdAt: new Date(),
      //       updatedAt: new Date(),
      //     },
      //   ],
      //   {}
      // );

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
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("accommodations", null, {});
  },
};
