"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_role: {
        type: Sequelize.UUID,
        defaultValue: "7adae2f1-4d35-470d-8512-1b9634330a9e",
      },
      managerId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
		  username: {
			type: Sequelize.STRING
		  },
		  phoneNumber: {
			type: Sequelize.STRING
		  },
		  image: {
			type: Sequelize.STRING
		  },
		  isVerified:{
			type: Sequelize.BOOLEAN
		  },
		  gender:{
			type: Sequelize.STRING
		  },
		  preferredLanguage:{
			type: Sequelize.STRING
		  },
		  preferredCurrency:{
			type: Sequelize.STRING
		  },
		  department:{
			type: Sequelize.STRING
		  },
		  lineManager:{
			type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
