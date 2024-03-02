const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const EmployeeController = require('../controllers/employee-controller');
const hrAuthorization = require('../middlewares/hr-authorization');

router.get('/my_profile', EmployeeController.getMyProfileEmployee)
router.get('/all_profile', hrAuthorization, EmployeeController.getAllProfileEmployeeHR)
router.get('/position', hrAuthorization, EmployeeController.getPositionListHR)

router.post('/create/profile', hrAuthorization, EmployeeController.createProfileEmployeeHR)

router.put('/update/profile/:id', upload.single("photo_profile"), EmployeeController.updateProfileEmployee)
router.put('/update/password', EmployeeController.updatePasswordEmployee)



module.exports = router