'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contractors', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        companyName: 'Waste Disposal',
        password: 'password1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        companyName: 'Recycling',
        password: 'password2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        companyName: 'Hazardous Waste',
        password: 'password3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contractors', null, {});
  }
};
