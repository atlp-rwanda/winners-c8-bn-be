"use strict";
const { v4: uuidv4 } = require("uuid");
const {hashPassword} = require("../../middlewares/hash");
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: '6927442b-84fb-4fc3-b799-11449fa62f52',
					firstName: 'Manager',
					lastName: 'User',
					email: 'manager@gmail.com',
					password: hashPassword('String@01'),
					user_role: '6927442b-84fb-4fc3-b799-11449fa62f52',
					isVerified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '7adae2f1-4d35-470d-8512-1b963433ea9f',
					firstName: 'Requester',
					lastName: 'User',
					email: 'requester@gmail.com',
					password: hashPassword('String@01'),
					user_role: '7adae2f1-4d35-470d-8512-1b9634330a9e',
					isVerified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
					managerId: '6927442b-84fb-4fc3-b799-11449fa62f52',
				},
			],
			{},
		);

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
