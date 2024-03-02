'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Position, {
        targetKey: 'id',
        foreignKey: 'position_id'
      })
      Employee.belongsTo(models.Employee, {
        targetKey: 'id',
        foreignKey: "created_by"
      })
      Employee.belongsTo(models.Employee, {
        targetKey: 'id',
        foreignKey: "last_updated_by"
      })
    }
  };
  Employee.init({
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate : {
        notNull : {
          args : true,
          msg : "first name cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "first name cannot be empty"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate : {
        notNull : {
          args : true,
          msg : "first name cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "first name cannot be empty"
        },
        isEmail: {
          args: true,
          msg: "Must be a valid email address",
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        min : {
          args : 6 ,
          msg : 'Password length min 6'
        }
      }
    },
    position_id: {
      type: DataTypes.INTEGER,
    },
    is_active: {
      type: DataTypes.BOOLEAN
    },
    photo_profile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER
    },
    last_updated_by: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Employee',
    hooks: {
      beforeCreate(instance){
  
        const password = instance.first_name + "123456";
        const salt = bcrypt.genSaltSync(10);

        instance.is_active = true;
        instance.email = instance.email.toLowerCase();
        instance.password = bcrypt.hashSync(password, salt);
      },
    }
  });
  return Employee;
};
