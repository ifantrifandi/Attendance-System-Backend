const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const basicAuth = require('../middlewares/basic-auth');
const errorHandler = require('../middlewares/error-handler');
const employeeController = require('../controllers/employee-controller');
const loginController = require('../controllers/login-controller');
const employeeRouter = require("./employee-router");


router.post('/login_employee', basicAuth, loginController.login)
router.post('/login_hr', basicAuth, loginController.loginHR)

router.get('/employee/profile/:id', basicAuth, employeeController.getProfileEmployeeById)

router.use(authorization)
router.use("/employee", employeeRouter)
router.use(errorHandler)

module.exports = router
