const jwt = require('jsonwebtoken')
const { Employee } = require('../models')

async function authorization(req, res, next) {
    if(req.headers.authorization){
      try {
          const auth = req.headers.authorization.split(" ")
        let decoded = jwt.verify(auth[1], process.env.SECRET_KEY)
        
            if(decoded){
                req.isLoggedIn = decoded
              try {
                const employee = await Employee.findOne({
                  where: {
                    id : req.isLoggedIn.id
                  }
                }) 
                if (employee.is_active) {
                  next()
                } else {
                  next({status : 401 , message : 'not authorize'})  
                }
              } catch (err) {
                next({status : 401 , message : 'not authorize'})   
              }
            } else {
                next({status : 401 , message : 'not authorize'})
            }
        }
        catch(err){
            next({status : 401 , message : 'not authorize'})
        }
    } else {
        next({status : 401 , message : 'not authorize'})
    }
}

module.exports = authorization
