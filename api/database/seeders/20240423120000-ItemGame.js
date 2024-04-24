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

     await queryInterface.bulkInsert('ItemGames',[
      {
        "id": "b3a05f52-6131-4dfc-ac6f-323231c79d25",
        "name": "Poition",
        "description": "Recover HP",
        "category": "HP",
        "quality": "L",
        "quantity": 300,
        "gemcost": 5,
        "goldcost": 100,
        "image": "Poition.jpg",
        "createdAt": "2024-04-20T08:52:28.105Z",
        "updatedAt": "2024-04-20T08:52:28.105Z"
      },
      {
        "id": "b3a05f52-6131-4dfc-ac6f-323231c79d26",
        "name": "Attack Buff",
        "description": "Increase Atkack point",
        "category": "ATK",
        "quality": "L",
        "quantity": 300,
        "gemcost": 5,
        "goldcost": 100,
        "image": "Attack.jpg",
        "createdAt": "2024-04-20T08:52:28.105Z",
        "updatedAt": "2024-04-20T08:52:28.105Z"
      },
      {
        "id": "b3a05f52-6131-4dfc-ac6f-323231c79d27",
        "name": "Def Buff",
        "description": "Increase Defense point",
        "category": "DEF",
        "quality": "L",
        "quantity": 300,
        "gemcost": 5,
        "goldcost": 100,
        "image": "Def.jpg",
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
     await queryInterface.bulkDelete('ItemGames', null, {});

  }
};
