"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accommodations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
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

    await queryInterface.createTable(
      "trip_requests",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        departure: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [3, 100],
          },
          name: "Departure",
        },
        destination: {
          type: Sequelize.STRING,
          allowNull: false,
          name: "Destination",
        },
        travel_reason: {
          type: Sequelize.STRING,
          allowNull: false,
          name: "Travel Reason",
        },
        accommodationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "accommodations",
            },
            key: "id",
          },
          onDelete: "cascade",
        },
        dateOfDeparture: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          name: "Date of Departure",
          validate: {
            min: Sequelize.NOW,
          },
        },
        dateOfReturn: {
          type: Sequelize.DATEONLY,
          allowNull: true,
          name: "Date of return",
          validate: {
            min: {
              args: [this.dateOfDeparture],
              msg: "Should be after date of departure",
            },
          },
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "pending",
          validate: {
            isIn: [["pending", "approved", "denied"]],
          },
        },
        tripType: {
          type: Sequelize.STRING,
          allowNull: false,
          name: "Trip type",
          validate: {
            isIn: [["return", "oneway"]],
          },
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          name: "Request owner",
          references: {
            model: {
              tableName: "users",
            },
            key: "id",
          },
          onDelete: "cascade",
        },
        managerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          name: "Direct Manager",
          references: {
            model: {
              tableName: "users",
            },
            key: "id",
          },
          onDelete: "cascade",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        validate: {
          returnDateBeforeDepartureDate() {
            if (this.dateOfReturn.isBefore(this.dateOfDeparture)) {
              throw new Error(
                "Date of return must be after Date of departure."
              );
            }
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("trip_requests");
    await queryInterface.dropTable("accommodations");
  },
};
