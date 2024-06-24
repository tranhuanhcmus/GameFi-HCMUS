'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('ItemApps', [
      {
        id: '7dc748d5-de7d-4a76-9a58-62463ee7be14',
        name: 'Gem',
        description: 'Gem',
        category: 'currency',
        quality: 'normal',
        quantity: 1,
        gemcost: 1,
        goldcost: 1000,
        image: '/uploads/gem.jpg',
        createdAt: '2024-05-07 22:22:05.251+07',
        updatedAt: '2024-05-07 22:22:05.251+07'
      },
      {
        id: '1a06543f-42c7-402f-a22a-32594b58c0e5',
        name: 'Gold',
        description: 'Gold',
        category: 'currency',
        quality: 'normal',
        quantity: 1,
        gemcost: 0,
        goldcost: 1,
        image: '/uploads/gold.jpg',
        createdAt: '2024-05-07 22:22:35.891+07',
        updatedAt: '2024-05-07 22:22:35.891+07'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('ItemApps', null, {});
  }
};
