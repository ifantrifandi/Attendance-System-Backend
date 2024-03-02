'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AbsenceEmployee extends Model {
    static associate(models) {
    }
  }
  AbsenceEmployee.init({
    employee_id: DataTypes.INTEGER,
    absence_date: DataTypes.DATEONLY,
    clock_in: DataTypes.DATE,
    clock_out: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AbsenceEmployee',
    hooks: {
      beforeCreate(instance){
        instance.absence_date = new Date()
        instance.clock_in = new Date()
      },
    }
  });
  return AbsenceEmployee;
};
