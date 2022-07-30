"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "trip_requests",
        [
          {
            id: 1,
            departureId: 1,
            travel_reason: "Studying my bachelor degree",
            accommodationId: 1,
            dateOfDeparture: "2022-07-17",
            dateOfReturn: null,
            status: "thinking",
            tripType: "idontknow",
            ownerId: uuidv4(),
            managerId: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            departureId: 1,
            travel_reason: "Tourism",
            accommodationId: 2,
            dateOfDeparture: "2022-07-17",
            dateOfReturn: "2022-07-20",
            status: "thinking",
            tripType: "return",
            ownerId: uuidv4(),
            managerId: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      await queryInterface.bulkInsert(
        "TripRequestDestinations",
        [
          {
            tripId: 1,
            destinationId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            tripId: 2,
            destinationId: 2,
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
    await queryInterface.bulkDelete("trip_requests", null, {});
  },
};
