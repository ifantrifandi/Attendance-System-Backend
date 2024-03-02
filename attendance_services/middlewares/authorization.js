const axios = require('axios');
const jwt = require('jsonwebtoken');

async function authorization(req, res, next) {
  if (req.headers.authorization) {
    try {
      const auth = req.headers.authorization.split(" ")
      let decoded = jwt.verify(auth[1], process.env.SECRET_KEY)

      const { data } = await axios({
        method: 'get',
        url: `${process.env.EMPLOYEE_SERVICE_URL}/employee/profile/${decoded.id}`,
        headers: {
          authorization: "Basic " + Buffer.from(process.env.USERNAME_BASIC + ':' + process.env.PASSWORD_BASIC).toString('base64')
        }
      })
      if (data.is_active) {
        req.isLoggedIn = decoded
        return next()
      } else {
        return next({status : 401 , message : 'not authorize'})
      }
    }
    catch (err) {
      return next({status : 401 , message : 'not authorize'})
    }
  } else {
    return next({status : 401 , message : 'not authorize'})
  }
}

module.exports = authorization
