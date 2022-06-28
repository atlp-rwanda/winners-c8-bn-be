"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "trip_requests",
        [
          {
            id: 1,
            departure: "kigali",
            destination: "toronto",
            travel_reason: "Studying my bachelor degree",
            accommodationId: 1,
            dateOfDeparture: "17-07-2022",
            dateOfReturn: null,
            status: "thinking",
            tripType: "idontknow",
            ownerId: 2,
            managerId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            departure: "kigali",
            destination: "maladives",
            travel_reason: "Tourism",
            accommodationId: 1,
            dateOfDeparture: "17-07-2022",
            dateOfReturn: "1-07-2022",
            status: "thinking",
            tripType: "return",
            ownerId: 3,
            managerId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
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
