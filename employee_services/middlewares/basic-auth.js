async function basicAuth(req, res, next) {
  if (req.headers.authorization) {
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = new Buffer.from(base64Credentials,'base64').toString();
    const [username, password] = credentials.split(':');
    if (username == process.env.USERNAME_BASIC && password == process.env.PASSWORD_BASIC) {
      next()
    } else {
      next({ status: 401, message: 'not authorize' })
    }
  } else {
    next({ status: 401, message: 'not authorize' })
  }
}

module.exports = basicAuth;
