"use strict";
const Protection = require("../../middlewares/hash");
const { hashPassword } = Protection;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "f683cce1-a43a-41aa-8fd4-f3cb68e5d865",
          firstName: "manager",
          lastName: "Doe",
          email: "manager@seed.com",
          password: hashPassword("Password@123"),
          user_role: "6927442b-84fb-4fc3-b799-11449fa62f52",
          managerId: null,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f683cce1-a43a-41aa-8fd4-f3cb68e5d866",
          firstName: "manager 2",
          lastName: "Doe",
          email: "manager2@gmail.com",
          password: hashPassword("Password@123"),
          user_role: "6927442b-84fb-4fc3-b799-11449fa62f52",
          managerId: null,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2bc69d45-b9a3-4440-a48a-6a232fa79600",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@seed.com",
          password: hashPassword("Password@123"),
          user_role: "7adae2f1-4d35-470d-8512-1b9634330a9e",
          managerId: "f683cce1-a43a-41aa-8fd4-f3cb68e5d865",
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "babd475d-a21f-4a65-bc92-fe13489ce4ff",
          firstName: "John",
          lastName: "Doe",
          email: "john@seed.com",
          password: hashPassword("Password@123"),
          user_role: "7adae2f1-4d35-470d-8512-1b9634330a9e",
          managerId: "f683cce1-a43a-41aa-8fd4-f3cb68e5d866",
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
