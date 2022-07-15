'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try{
    await queryInterface.bulkInsert('roles', [
      {
        id: "013dddd7-2769-4de6-8fc3-7aa527114879",
        roleName: "super-admin",
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        id: "d01c0e35-b0ec-4724-85d5-48c2ecc995e7",
        roleName: "travel-admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "6927442b-84fb-4fc3-b799-11449fa62f52",
        roleName: "manager",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "7adae2f1-4d35-470d-8512-1b9634330a9e",
        roleName: "requester",
        createdAt: new Date(),
        updatedAt: new Date()
      }
       ], {});
      }catch(error){
        console.log(error);
       }
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
    
  }
};
