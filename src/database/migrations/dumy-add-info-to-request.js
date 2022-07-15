'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('trip_requests', 'passportName', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn('trip_requests', 'passportNumber', {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('trip_requests', 'passportName');
      await queryInterface.removeColumn('trip_requests', 'passportNumber');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
