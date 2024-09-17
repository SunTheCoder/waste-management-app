'use strict';


const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contractor extends Model {
    static associate(models) {
      // A contractor can handle many bookings or jobs
      Contractor.hasMany(models.Booking, { foreignKey: 'contractorId' });
    }
  }

  Contractor.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Contractor',
  });

  return Contractor;
};
