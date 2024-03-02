'use strict';

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
    await queryInterface.bulkInsert('Positions', [
      {
        name: 'SYSTEM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Operation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "IT",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: "Legal",
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Positions', null, {});
  }
};
