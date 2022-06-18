
const Protection = require("../../middlewares/hash");
const {v4 : uuidv4} = require('uuid');
const  {hashPassword} = Protection;

module.exports = {
      up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'Users', [
          {
            id: uuidv4(),
            firstName: 'nyakamwe',
            lastName: 'aimable',
            email: 'nyakamweaimable@gmail.com',
            password: hashPassword('Tester@12345'),
            user_role: "013dddd7-2769-4de6-8fc3-7aa527114879",
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ], {}),

      down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};