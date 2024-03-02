const express = require('express');
const router = express.Router();

const AbsenceController = require("../controllers/absence-controller");

const hrAuthorization = require('../middlewares/hr-authorization');

router.post("/", AbsenceController.employeeAbsence)

router.get("/my_absence_today", AbsenceController.getMyEmployeeAbsenceToday)
router.get("/my_absence", AbsenceController.getMyEmployeeAbsence)
router.get("/all_absence", hrAuthorization, AbsenceController.getAllEmployeeAbsence)

module.exports = router