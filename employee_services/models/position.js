'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate(models) {
    }
  };
  Position.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        notNull : {
          args : true,
          msg : "position name cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "position name cannot be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Position',
  });
  return Position;
};