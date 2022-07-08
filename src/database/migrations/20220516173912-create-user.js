module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.TEXT,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      officeAddres: {
        type: Sequelize.STRING,
      },
      preferedLanguage: {
        type: Sequelize.STRING,
      },
      roleId: {
        type: Sequelize.INTEGER,
      },
      lineManager: {
        type: Sequelize.INTEGER,
      },
      googleId: {
        type: Sequelize.STRING,
      },
      facebookId: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  },
};
