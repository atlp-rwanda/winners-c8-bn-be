"use strict";
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../../middlewares/hash");
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            id: "7adae2f1-4d35-470d-8512-1b9634330a9f",
            firstName: "Manager",
            lastName: "User",
            email: "bagira.sostenee@gmail.com",
            password: hashPassword("String@01"),
            user_role: "6927442b-84fb-4fc3-b799-11449fa62f52",
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "7adae2f1-4d36-470d-8512-1b9634330a9f",
            firstName: "Requester",
            lastName: "User",
            email: "requester@gmail.com",
            password: hashPassword("String@01"),
            user_role: "7adae2f1-4d35-470d-8512-1b9634330a9e",
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            managerId: "7adae2f1-4d35-470d-8512-1b9634330a9f",
          },
        ],
        {}
      );

      await queryInterface.bulkInsert(
        "accommodations",
        [
          {
            id: -1,
            name: "Toronto Hotel",
            description: "capital street, Toronto, Ontario",
            location_id: 1,
            latitude: 20.57,
            longitude: -10.32,
            images_links: [
              "https://freesvg.org/img/SC0007.Scribble-house.png",
              "https://freesvg.org/img/maison2.png",
            ],
            add_on_services: JSON.stringify([
              {
                name: "Car",
                details: "A five-seats car is proviced.",
              },
              {
                name: "Pool",
                details: "a 3x3x3 metres swimming pool.",
              },
            ]),
            amenities: JSON.stringify([
              {
                name: "Car",
                details: "A five-seats car is proviced.",
              },
              {
                name: "Pool",
                details: "a 3x3x3 metres swimming pool.",
              },
            ]),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 0,
            name: "Reethi beach resort",
            description: "Reethi Beach, Fonimagoodhoo Island 20215",
            location_id: 2,
            latitude: 4,
            longitude: 4,
            images_links: [
              "https://freesvg.org/img/spooky-house.png",
              "https://freesvg.org/img/purzen_House_icon.png",
            ],
            add_on_services: JSON.stringify([
              {
                name: "Car",
                details: "A five-seats car is proviced.",
              },
              {
                name: "Pool",
                details: "a 3x3x3 metres swimming pool.",
              },
            ]),
            amenities: JSON.stringify([
              {
                name: "Car",
                details: "A five-seats car is proviced.",
              },
              {
                name: "Pool",
                details: "a 3x3x3 metres swimming pool.",
              },
            ]),
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
