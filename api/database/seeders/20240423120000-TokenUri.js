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

     await queryInterface.bulkInsert('TokenUris',[
      {
        tokenUri:"https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json",
        data:`{"name":"Harry's Dragon","type":"NFT","image":"https://images.nightcafe.studio/jobs/ZmXUlD3BXhjV4i4wnWka/ZmXUlD3BXhjV4i4wnWka--1--zv5e8.jpg?tr=w-1600,c-at_max","title":"Test","tokenId":"104","attributes":{"element":"1","eye":"1","fur":"1","item":"1"},"description":"This is a normal Dragon"}`,
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
     await queryInterface.bulkDelete('TokenUris', null, {});

  }
};
