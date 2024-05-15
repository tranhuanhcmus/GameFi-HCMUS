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

     await queryInterface.bulkInsert('ItemGameOwners',[
      {
        "id": "baebb924-5be9-4a6a-81d5-80fcc5c5ba48",
        "owner": "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        "quantity": 100,
        "createdAt": "2024-04-20T08:52:28.105Z",
        "updatedAt": "2024-04-20T08:52:28.105Z"
      },
      {
        "id": "b86e38fe-c9e2-4437-8f7e-08455b3e4c8e",
        "owner": "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        "quantity": 100,
        "createdAt": "2024-04-20T08:52:28.105Z",
        "updatedAt": "2024-04-20T08:52:28.105Z"
      },
      {
        "id": "a8affeaf-f7ba-4374-b42a-32422c521b0c",
        "owner": "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        "quantity": 100,
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
     await queryInterface.bulkDelete('ItemGameOwners', null, {});

  }
};
