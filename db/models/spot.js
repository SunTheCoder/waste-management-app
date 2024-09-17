'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // A spot belongs to an owner (User with role "owner")
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });

      // A spot can have many bookings (handled by employees or contractors)
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    }
  }

  Spot.init({
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Spot',
  });

  return Spot;
};
