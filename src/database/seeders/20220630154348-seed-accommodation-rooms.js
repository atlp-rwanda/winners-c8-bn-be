"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "accommodation_rooms",
        [
          {
            id: -4,
            accommodation_id: -1,
            bed_type: "x-large",
            cost: 2000.0134,
            images_links: ["https://freesvg.org/img/1538347992.png","https://freesvg.org/img/saladeestar.png","https://freesvg.org/img/Machovka-Plank-bed.png"],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: -3,
            accommodation_id: 0,
            bed_type: "medium",
            cost: 123000,
            images_links: ["https://freesvg.org/img/furniture.png","https://freesvg.org/img/1291974833.png"],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: -2,
            accommodation_id: 0,
            bed_type: "small",
            cost: 133.033,
            images_links: ["https://freesvg.org/img/Pink-Room-First-Person-Perspective.png"],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: -1,
            accommodation_id: -1,
            bed_type: "x-large",
            cost: 2000,
            images_links: ["https://freesvg.org/img/Corner.png","https://freesvg.org/img/cubic.png"],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 0,
            accommodation_id: -1,
            bed_type: "x-small",
            cost: 90,
            images_links: ["https://freesvg.org/img/Machovka-Plank-bed.png","https://freesvg.org/img/Fictional-Apartment-In-A-Skyscraper.png"],
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
    await queryInterface.bulkDelete("accommodation_rooms", null, {});
  },
};
