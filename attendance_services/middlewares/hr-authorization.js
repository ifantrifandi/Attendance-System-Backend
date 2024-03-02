async function hrAuthorization(req, res, next) {
  if (req.isLoggedIn) {
    if (req.isLoggedIn.position == "HR" || req.isLoggedIn.position == "SYSTEM") {
      next()
    } else {
      next({status : 401 , message : 'not authorize'})
    }
  } else {
    next({status : 401 , message : 'not authorize'})
  }
}

module.exports = hrAuthorization;
