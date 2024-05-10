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

     await queryInterface.bulkInsert('ItemPools',[
      {
        id:"1",
        description:"sword",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"2",
        description:"shield",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"3",
        description:"spear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"4",
        description:"bow",
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
     await queryInterface.bulkDelete('ItemPools', null, {});

  }
};
