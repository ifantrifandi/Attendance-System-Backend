const { Employee, Position } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginController{

  static async login(req, res, next) {
    if (req.body.email && req.body.password) {
      try {
        const employee = await Employee.findOne({
          where: {
            email: req.body.email.toLowerCase()
          }, include: [{
            model: Position
          }]
        })

        if (!employee) {
          return next({ status: 400, message: 'invalid email / password' });
        }
      
        let checkPassword = bcrypt.compareSync(req.body.password , employee.password)

        if(checkPassword){
          let access_token = jwt.sign({ id : employee.id , email : employee.email, position: employee.Position.name} , process.env.SECRET_KEY)

          res.status(200).json({
              access_token,
              id : employee.id,
              email: employee.email,
              first_name: employee.first_name,
              last_name: employee.last_name,
              position: employee.Position.name,
              photo_profile: employee.photo_profile
          })
        }else{
          return next({status : 400 , message : 'invalid email / password' })
        }
      } catch (err) {
        return next(err)
      }
    } else {
      return next({ status: 400, message: "invalid email / password"})
    }
  }

  static async loginHR(req, res, next) {
    if (req.body.email && req.body.password) {
      try {
        const employee = await Employee.findOne({
          where: {
            email: req.body.email.toLowerCase()
          }, include: [{
            model: Position
          }]
        })

        if (!employee) {
          return next({ status: 400, message: 'invalid email / password' });
        }
      
        if (employee.Position.name != "HR" && employee.Position.name != "SYSTEM") {
          return next({ status: 400, message: 'invalid email / password' });
        }

        let checkPassword = bcrypt.compareSync(req.body.password , employee.password)

        if(checkPassword){
          let access_token = jwt.sign({ id : employee.id , email : employee.email, position: employee.Position.name} , process.env.SECRET_KEY)

          res.status(200).json({
              access_token,
              id : employee.id,
              email: employee.email,
              first_name: employee.first_name,
              last_name: employee.last_name,
              position: employee.Position.name,
              photo_profile: employee.photo_profile
          })
        }else{
          return next({status : 400 , message : 'invalid email / password' })
        }
      } catch (err) {
        return next(err)
      }
    } else {
      return next({ status: 400, message: "invalid email / password"})
    }
  }
}

module.exports = LoginController;
