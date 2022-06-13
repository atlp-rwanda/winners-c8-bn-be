module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accomodations', [{
      name: 'Radisson Blu Hotel',
      description: 'Book by January 31 to save up to 25% on stays until August 31. Join Radisson Rewards to unlock the full discount. Enjoy restaurant discounts.',
      location_id: '10000',
      cost: 1000,
      facilities: ['parking', 'pool', 'wifi'],
      capacity: 9,
      roomsLeft: 10,
      image: 'image',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'serena Blu Hotel',
      description: 'Book by January 31 to save up to 25% on stays until August 31. Join Radisson Rewards to unlock the full discount. Enjoy restaurant discounts.',
      location_id: '10000',
      cost: 1000,
      facilities: ['parking', 'pool', 'wifi'],
      capacity: 9,
      roomsLeft: 10,
      image: 'image',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'sky Blu Hotel',
      description: 'Book by January 31 to save up to 25% on stays until August 31. Join Radisson Rewards to unlock the full discount. Enjoy restaurant discounts.',
      location_id: '10000',
      cost: 1000,
      facilities: ['parking', 'pool', 'wifi'],
      capacity: 9,
      roomsLeft: 10,
      image: 'image',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accomodations', null, {});
  },
};
