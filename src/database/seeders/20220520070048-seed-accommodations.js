"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
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

      await queryInterface.bulkInsert(
        "accommodation_likes",
        [
          {
            accommodationId: -1,
            userId: "2bc69d45-b9a3-4440-a48a-6a232fa79600",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            accommodationId: 0,
            userId: "2bc69d45-b9a3-4440-a48a-6a232fa79600",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            accommodationId: -1,
            userId: "babd475d-a21f-4a65-bc92-fe13489ce4ff",
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
    await queryInterface.bulkDelete("accommodation_likes", null, {});
    await queryInterface.bulkDelete("accommodations", null, {});
  },
};
