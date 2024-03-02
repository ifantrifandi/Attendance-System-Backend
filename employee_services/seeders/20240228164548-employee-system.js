'use strict';
const { Position } = require('../models');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    try {
      const checkSystemEmployee = await Position.findOne({ where: { name: "SYSTEM" } })
      const salt = bcrypt.genSaltSync(10);
      await queryInterface.bulkInsert('Employees', [{
        first_name: "SYSTEM",
        last_name: "SYSTEM",
        email: "system@email.com",
        phone_number: "SYSTEM",
        password: bcrypt.hashSync("SYSTEM", salt),
        is_active: true,
        position_id: checkSystemEmployee.dataValues.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        photo_profile: null,
      }]);

    } catch (err) {
      console.log("system not found, failed to seeding")
    }
    

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Employees', null, {});
  }
};
