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

    await queryInterface.bulkInsert('NFTs',[
      {
        tokenId:104,
        tokenUri:"https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json",
        owner:"0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        exp:0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tokenId:105,
        tokenUri:"https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json",
        owner:"0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
        exp:0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tokenId:106,
        tokenUri:"https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json",
        owner:"0x70706f6Aab6Eea877AaCb7A86fd813F3667ca937",
        exp:0,
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
     await queryInterface.bulkDelete('NFTs', null, {});
  }
};
