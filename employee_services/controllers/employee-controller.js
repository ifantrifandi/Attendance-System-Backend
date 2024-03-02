const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { Employee, Position } = require('../models');

class EmployeeController {  
  static async getMyProfileEmployee (req, res, next) {
    try {
      const employee = await Employee.findOne({
        where: {
          id : req.isLoggedIn.id
        },
        include: [{
          model: Position
        }]
      })

      return res.status(200).json(employee)
    } catch (err) {
      return next(err)
    }
  }

  static async getProfileEmployeeById(req, res, next) {
    try {
      const employee = await Employee.findOne({
        where: {
          id : req.params.id
        },
        include: [{
          model: Position
        }]
      })

      return res.status(200).json(employee)
    } catch (err) {
      return next(err)
    }
  }

  static async getAllProfileEmployeeHR(req, res, next) {
    try {
      const allEmployee = await Employee.findAll({
        order: [['first_name', 'ASC']],
        include: [{
          model: Position
        }]
      })
      
      return res.status(200).json(allEmployee)
    } catch (err) {
      return next(err)
    }
  }

  static async createProfileEmployeeHR(req, res, next) {
    try {
      const createdEmployee = await Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: "",
        phone_number: req.body.phone_number,
        position_id: req.body.position_id,
        created_by: req.isLoggedIn.id,
        last_updated_by: req.isLoggedIn.id,
      })

      return res.status(201).json(createdEmployee)
    } catch (err) {
      return next(err)
    }
  }

  static async updatePasswordEmployee(req, res, next) {
    try {
      const employee = await Employee.findOne({
        where: {
          id : req.isLoggedIn.id
        }
      })

      if (employee.first_name == "SYSTEM") {
        return next({message: "not authorize", status: 401 })
      }      

      if (req.body.new_password.length < 6) {
        return next({ message: "password min 6 characters", status: 400 })
      }

      const salt = bcrypt.genSaltSync(10);

      const checkPassword = bcrypt.compareSync(req.body.old_password , employee.password)
  
      const newPassword = bcrypt.hashSync(req.body.new_password, salt)

      if (checkPassword) {
        try {
          const _ = await Employee.update({ password: newPassword }, {
            where: {
              id: req.isLoggedIn.id
            }
          })

          return res.status(200).json({ message: "success update password" })
        } catch (err) {
          return next(err)
        }
      } else {
        return next({status: 400, message: "wrong old password"})
      }

    } catch (err) {
      return next(err)
    }
  }

  static async updateProfileEmployee(req, res, next) {
    const paramsId = req.params.id;
    if (!paramsId) {
      return next({ message: "not authorize", status: 401 })
    }

    try {
      const employee = await Employee.findOne({
        where: {
          id : req.isLoggedIn.id
        },
        include: [{
          model: Position
        }]
      })

      if (req.isLoggedIn.id != paramsId) {
        if (employee.Position.name != "HR" && employee.Position.name != "SYSTEM") {
          return next({ message: "not authorize", status: 401 })
        }
      }

      const checkEmployee = await Employee.findOne({
        where: {
          id : req.params.id
        }
      })

      if (checkEmployee.first_name == "SYSTEM") {
        return next({ message: "not authorize", status: 401 })   
      }
      
      const formData = {...req.body};

      if (req.isLoggedIn.id == req.params.id
        && ((formData.email && formData.email != employee.email)
          || (formData.first_name && formData.first_name != employee.first_name)
          || (formData.last_name && formData.last_name != employee.last_name)
          || (formData.position_id && formData.position_id != employee.position_id)
          || (formData.is_active && formData.is_active.toString() != employee.is_active.toString()))) {
            return next({ message: "not authorize", status: 401 })     
      }

      let encodedImage

      if (req.file) {
        encodedImage = req.file.buffer.toString('base64');
      }

      const employeeUpdate = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        email: formData.email,
        position_id: formData.position_id,
        is_active: formData.is_active,
        last_updated_by: req.isLoggedIn.id,
        photo_profile: encodedImage ? encodedImage : employee.photo_profile
      }
        
      const _ = await Employee.update(employeeUpdate, {
        where: {
          id: paramsId
        }
      })

      return res.status(200).json({ message: "success update employee" })
    } catch (err) {
      return next(err)
    }

  }

  static async getPositionListHR(req, res, next) {
    try {
      const allPosition = await Position.findAll({
        where: {
          name: {
            [Op.notLike]: "SYSTEM"
          }
        }
      })
      
      return res.status(200).json(allPosition)
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = EmployeeController;
