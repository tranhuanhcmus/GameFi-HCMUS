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

     await queryInterface.bulkInsert('ItemApps',[
      {
        "id": "b3a05f52-6131-4dfc-ac6f-323231c79d23", 
        "name": "Gem",
        "description": "Advanced currency",
        "category": "Currency",
        "quality": "Gem",
        "quantity": 0,
        "gemcost": 0,
        "goldcost": 0,
        "image": "Gem.jpg",
        "createdAt": "2024-04-20T08:52:28.105Z",
        "updatedAt": "2024-04-20T08:52:28.105Z"
      },
      {
        "id": "b3a05f52-6131-4dfc-ac6f-323231c79d24",
        "name": "Gold",
        "description": "Basic currency",
        "category": "Currency",
        "quality": "Gold",
        "quantity": 0,
        "gemcost": 5,
        "goldcost": 0,
        "image": "Gold.jpg",
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
     await queryInterface.bulkDelete('ItemApps', null, {});

  }
};
