module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rolepermissions', [{
      role_id: '2',
      permission_id: '11',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '2',
      permission_id: '12',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '2',
      permission_id: '13',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '2',
      permission_id: '14',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '2',
      permission_id: '15',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '2',
      permission_id: '16',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '5',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '6',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '7',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '8',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '9',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '3',
      permission_id: '10',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '4',
      permission_id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '4',
      permission_id: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '4',
      permission_id: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '4',
      permission_id: '4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '4',
      permission_id: '5',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      role_id: '4',
      permission_id: '6',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '3',
      permission_id: '53',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '3',
      permission_id: '27',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '3',
      permission_id: '28',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '3',
      permission_id: '29',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '4',
      permission_id: '29',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '3',
      permission_id: '30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '4',
      permission_id: '31',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_id: '4',
      permission_id: '30',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  

  down: (queryInterface) => queryInterface.bulkDelete('rolepermissions', null, {}),
};
