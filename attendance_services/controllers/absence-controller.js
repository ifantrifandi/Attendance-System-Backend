const moment = require('moment');
const { AbsenceEmployee } = require('../models');
const { Op } = require('sequelize');

class AbsenceController {
  static async employeeAbsence(req, res, next) {
    try {
      const dateNow = moment(new Date()).format("YYYY-MM-DD")

      const absence = await AbsenceEmployee.findOne({
        where: {
          employee_id: req.isLoggedIn.id,
          absence_date: dateNow,
        }
      })

      if (!absence) {
        const createAbsence = await AbsenceEmployee.create({
          absence_date: moment(new Date()).format("YYYY-MM-DD"),
          clock_in: new Date(),
          employee_id: req.isLoggedIn.id,
        })

        return res.status(201).json(createAbsence);
      } else {
        const _ = await AbsenceEmployee.update({
          clock_out: new Date(),
        }, {
          where: {
            id: absence.id
          }
        })

        const updatedAbsence = await AbsenceEmployee.findOne({
          where: {
            employee_id: req.isLoggedIn.id,
            absence_date: dateNow,
          }
        })

        return res.status(200).json(updatedAbsence);
      }
    } catch (err) {
      return next(err)
    }
  }

  static async getMyEmployeeAbsenceToday(req, res, next) {
    try {
      const dateNow = moment(new Date()).format("YYYY-MM-DD")

      const absence = await AbsenceEmployee.findOne({
        where: {
          employee_id: req.isLoggedIn.id,
          absence_date: dateNow,
        }
      })

      return res.status(200).json(absence)
    } catch (err) {
      return next(err)
    }
  }

  static async getMyEmployeeAbsence(req, res, next) {
    const absenceDateStart = req.query.start_date
    const absenceDateEnd = req.query.end_date

    try {
      const absence = await AbsenceEmployee.findAll({
        where: {
          employee_id: req.isLoggedIn.id,
          absence_date: {
            [Op.between]: [
              absenceDateStart ? absenceDateStart : moment(new Date(absenceDateEnd ? absenceDateEnd : null)).startOf('month').format('YYYY-MM-DD'),
              absenceDateEnd ? absenceDateEnd : moment(new Date()).format("YYYY-MM-DD")]
          }, 
        },
        order: [["absence_date", "DESC"]]
      })

      return res.status(200).json(absence)
    } catch (err) {
      return next(err)
    }
  }

  static async getAllEmployeeAbsence(req, res, next) {
    const absenceDateStart = req.query.start_date
    const absenceDateEnd = req.query.end_date

    try {
      const absence = await AbsenceEmployee.findAll({
        where: {
          absence_date: {
            [Op.between]: [
              absenceDateStart ? absenceDateStart : moment(new Date(absenceDateEnd ? absenceDateEnd : null)).startOf('month').format('YYYY-MM-DD'),
              absenceDateEnd ? absenceDateEnd : moment(new Date()).format("YYYY-MM-DD")]
          }
        },
        order: [["absence_date", "DESC"]]
      })

      return res.status(200).json(absence)
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = AbsenceController;
