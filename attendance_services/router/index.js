const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const errorHandler = require('../middlewares/error-handler');
const absenceRouter = require("./absence-router");

router.use(authorization)

router.use("/absence", absenceRouter)

router.use(errorHandler)

module.exports = router
