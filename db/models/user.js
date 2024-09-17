'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // An employee or owner can have many bookings
      User.hasMany(models.Booking, { foreignKey: 'userId' });
      
      // An owner has many spots (waste disposal routes, etc.)
      User.hasMany(models.Spot, { foreignKey: 'ownerId', as: 'ownedSpots' });
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
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
    role: {
      type: DataTypes.ENUM('owner', 'employee'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
