'use strict';

const { UUIDV4 } = require('sequelize');

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

     await queryInterface.bulkInsert('ItemAppOwners',[
      {
        "id": "b3a05f52-6131-4dfc-ac6f-323231c79d23",
        "owner": "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        "quantity": 10000,
        "createdAt": "2024-04-20T08:52:28.105Z",
        "updatedAt": "2024-04-20T08:52:28.105Z"
      },
      {
        "id": "b3a05f52-6131-4dfc-ac6f-323231c79d24",
        "owner": "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        "quantity": 1000000,
        "createdAt": "2024-04-20T08:52:28.105Z",
        "updatedAt": "2024-04-20T08:52:28.105Z"
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
     await queryInterface.bulkDelete('ItemAppOwners', null, {});

  }
};
