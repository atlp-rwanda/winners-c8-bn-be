"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try{
    await queryInterface.bulkInsert(
      "Locations",
      [
        {
          id: 1,
          city: "Kigali City",
          state: null,
          province: "kigali",
          country: "Rwanda",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          city: "Nairobi City",
          state: null,
          province: "Nairobi",
          country: "Kenya",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          city: "Buffalo",
          state: "New York State",
          province: null,
          country: "United States of America",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );}catch(e){
      console.log(e)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Locations", null, {});
  },
};
