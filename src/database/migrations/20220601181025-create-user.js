'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
	 await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal('uuid_generate_v4()'),
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
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_role: {
				type: Sequelize.ENUM(
					'admin',
					'requester',
					'manager',
					'traveler',
				),
				defaultValue: 'requester',
			},
			email_verified: {
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
		async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
 		 }
	};