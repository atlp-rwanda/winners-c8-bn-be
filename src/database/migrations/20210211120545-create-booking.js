module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      checkinDate: {
        type: Sequelize.DATE,
      },
      checkoutDate: {
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      AccomodationId: {
        type: Sequelize.INTEGER,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  },
};
