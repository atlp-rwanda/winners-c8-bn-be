"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
			'trip_requests',
			[
				{
					id: 1,
					departureId: 1,
					destinationId: 3,
					travel_reason: 'Studying my bachelor degree',
					accommodationId: 1,
					dateOfDeparture: '2022-07-06',
					dateOfReturn: '2022-08-15',
					status: 'thinking',
					tripType: 'idontknow',
					ownerId: '7adae2f1-4d35-470d-8512-1b963433ea9f',
					managerId: '6927442b-84fb-4fc3-b799-11449fa62f52',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				// {
				// 	id: 2,
				// 	departureId: 1,
				// 	destinationId: 2,
				// 	travel_reason: 'Tourism',
				// 	accommodationId: 1,
				// 	dateOfDeparture: '2022-07-06',
				// 	dateOfReturn: '2022-07-13',
				// 	status: 'thinking',
				// 	tripType: 'return',
				// 	ownerId: 3,
				// 	managerId: 1,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	id: 3,
				// 	departureId: 2,
				// 	destinationId: 3,
				// 	travel_reason: 'Studying my master degree',
				// 	accommodationId: 1,
				// 	dateOfDeparture: '2022-07-06',
				// 	dateOfReturn: "2022-08-15",
				// 	status: 'thinking',
				// 	tripType: 'idontknow',
				// 	ownerId: 1,
				// 	managerId: 1,
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
			],
			{},
		);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
