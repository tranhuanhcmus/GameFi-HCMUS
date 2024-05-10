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

     await queryInterface.bulkInsert('ElementPools',[
      {
        id:"1",
        description:"fire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"2",
        description:"water",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"3",
        description:"earth",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"4",
        description:"air",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"5",
        description:"light",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:"6",
        description:"darkness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id:"7",
        description:"metal",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ElementPools', null, {});

  }
};
