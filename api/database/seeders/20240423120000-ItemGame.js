'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('ItemGames', [
      {
        id: 'baebb924-5be9-4a6a-81d5-80fcc5c5ba48',
        name: 'Energy Poition',
        description: 'Energy restoration',
        category: 'Poition',
        quality: 'Normal',
        quantity: 10,
        gemcost: 1,
        goldcost: 1000,
        image: '/uploads/itemGame-item_game_energyPoition.svg',
        createdAt: '2024-05-09 22:27:48.417+07',
        updatedAt: '2024-05-09 22:27:48.417+07'
      },
      {
        id: 'b86e38fe-c9e2-4437-8f7e-08455b3e4c8e',
        name: 'HP Poition',
        description: 'HP restoration',
        category: 'Poition',
        quality: 'Normal',
        quantity: 10,
        gemcost: 1,
        goldcost: 1000,
        image: '/uploads/itemGame-item_game_hpPoition.png',
        createdAt: '2024-05-09 22:28:54.329+07',
        updatedAt: '2024-05-09 22:28:54.329+07'
      },
      {
        id: 'a8affeaf-f7ba-4374-b42a-32422c521b0c',
        name: 'Mana Poition',
        description: 'Mana restoration',
        category: 'Poition',
        quality: 'Normal',
        quantity: 10,
        gemcost: 1,
        goldcost: 1000,
        image: '/uploads/itemGame-item_game_manaPoition.png',
        createdAt: '2024-05-09 22:30:04.225+07',
        updatedAt: '2024-05-09 22:30:04.225+07'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('ItemGames', null, {});
  }
};