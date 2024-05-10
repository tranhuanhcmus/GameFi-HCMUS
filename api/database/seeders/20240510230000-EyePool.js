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

     await queryInterface.bulkInsert('EyePools',[
      {
        id:"1",
        description:"happy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"2",
        description:"sleepy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"3",
        description:"angry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"4",
        description:"innocent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('EyePools', null, {});

  }
};
