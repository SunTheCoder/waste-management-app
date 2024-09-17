'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      contractorId: {
        type: Sequelize.INTEGER,
        references: { model: 'Contractors', key: 'id' },
        allowNull: true,  // Not all bookings have contractors
        onDelete: 'SET NULL'
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: { model: 'Spots', key: 'id' },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Change for SQLite compatibility

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Change for SQLite compatibility

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
