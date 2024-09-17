'use strict';


const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // A booking belongs to a user (employee/owner) and a spot
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });

      // A booking can also be assigned to a contractor
      Booking.belongsTo(models.Contractor, { foreignKey: 'contractorId' });
    }
  }

  Booking.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
