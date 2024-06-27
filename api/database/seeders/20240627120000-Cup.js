'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Cups', [
      {
        id: 'baebb924-5be9-4a6a-81d5-80fcc5c5ba22',
        owner: '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454',
        cup: 10,
        createdAt: '2024-05-09 22:27:48.417+07',
        updatedAt: '2024-05-09 22:27:48.417+07'
      },
      {
        id: 'baebb924-5be9-4a6a-81d5-80fcc5c5ba23',
        owner: '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454',
        cup: 20,
        createdAt: '2024-05-09 22:27:48.417+07',
        updatedAt: '2024-05-09 22:27:48.417+07'
      },
      {
        id: 'baebb924-5be9-4a6a-81d5-80fcc5c5ba45',
        owner: '0xFe25C8BB510D24ab8B3237294D1A8fCC93241455',
        cup: 10,
        createdAt: '2024-05-09 22:27:48.417+07',
        updatedAt: '2024-05-09 22:27:48.417+07'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Cups', null, {});
  }
};