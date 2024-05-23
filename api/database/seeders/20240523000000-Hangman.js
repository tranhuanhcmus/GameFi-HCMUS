'use strict';
const uuids = [
  'e8724e05-1056-4798-9a0b-1cd3a91f8c70',
  'ac032e2e-4db0-42d0-8c3e-50b52d15636b',
  '8d3a0a0e-ee16-4849-b3e7-45612b825951',
  '9d8ff0e7-7e42-41de-aa9e-c4f1f45855cb',
  'f012784b-2a42-47f4-ba03-b26854688213',
  'd95adccb-16cc-45c2-a417-11e6328c730e',
  'f3f1661c-0e3b-43a3-8c14-1d8b5966f4b5',
  '58f58d5d-36c8-4fb4-8b44-5b59330fc98d',
  'f0bfb4f1-f1f1-4692-a283-0a5e6e1a93df',
  'b32d9058-4e8d-4b7e-b6ad-8f3bca326c6e',
  'd8d9d0e8-29f5-4ff2-b32a-f04e61d10c58',
  '19de3335-d956-4c11-82b2-fc3e2a1f8a51',
  '6cc725e8-b138-4654-8c54-05cf366a9321',
  '02f14e65-0b3f-4c5e-a5b2-61f8b52d5225',
  '0ac9ee48-b23a-4abf-b4d2-1f1592f136fc',
  'e2680792-812f-4e2d-b57d-7c8d71c92eb4',
  'ee2f8ed3-919e-42e5-bf9f-f085c2fd75cc',
  '60c90c02-4596-409b-95f0-184a58807a89',
  '6d4c1688-ff04-42c3-8b7c-bac125e07a4f',
  'e8d0599b-f13a-4f89-bf38-06af646a8552',
  'c1cfb0a9-fad9-48e5-b8f4-7077bc4d6c9f',
  '1a9b25c8-aa0b-4fd7-8c0a-795c6d0e4b80',
  '7290e3b0-4188-4882-8db0-2a7ec5f61b32',
  'a1a5f107-eae5-4e77-8a3b-370597961e27',
  'ff11d6c0-0d36-49a7-88c2-33e4e61b6da4'
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Hangmans', [
      {
        id: uuids[0],
        question: 'What is the largest planet in our solar system?',
        answer: 'JUPITER',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[1],
        question: 'What animal is known as the \'King of the Jungle\'?',
        answer: 'LION',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[2],
        question: 'What do you call a shape with eight sides?',
        answer: 'OCTAGON',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[3],
        question: 'What is the capital of Italy?',
        answer: 'ROME',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[4],
        question: 'What is the smallest unit of life?',
        answer: 'CELL',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[5],
        question: 'What fruit is used to make wine?',
        answer: 'GRAPE',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[6],
        question: 'What is the hardest natural substance on Earth?',
        answer: 'DIAMOND',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[7],
        question: 'What is the largest mammal?',
        answer: 'WHALE',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[8],
        question: 'What is the common name for sodium chloride?',
        answer: 'SALT',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[9],
        question: 'What is the world\'s longest river?',
        answer: 'NILE',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[10],
        question: 'What organ pumps blood through the body?',
        answer: 'HEART',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[11],
        question: 'What is the term for a baby cat?',
        answer: 'KITTEN',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[12],
        question: 'What is the capital city of Japan?',
        answer: 'TOKYO',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[13],
        question: 'What is the main gas found in the air we breathe?',
        answer: 'NITROGEN',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[14],
        question: 'What is the smallest continent by land area?',
        answer: 'AUSTRALIA',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[15],
        question: 'What do cows produce that humans commonly drink?',
        answer: 'MILK',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[16],
        question: 'What is the primary ingredient in bread?',
        answer: 'FLOUR',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[17],
        question: 'What is the term for frozen water?',
        answer: 'ICE',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[18],
        question: 'What is the main language spoken in Spain?',
        answer: 'SPANISH',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[19],
        question: 'Hoang Sa, Truong Sa belong to?',
        answer: 'VIETNAM',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[20],
        question: 'What is the fastest land animal?',
        answer: 'CHEETAH',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[21],
        question: 'What is the currency of the United Kingdom?',
        answer: 'POUND',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[22],
        question: 'What is the chemical symbol for oxygen?',
        answer: 'O2',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[23],
        question: 'What is the currency of the United State?',
        answer: 'USD',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
      {
        id: uuids[24],
        question: 'What is the chemical symbol for water?',
        answer: 'H2O',
        createdAt: '2024-05-23T18:02:29.020+07',
        updatedAt: '2024-05-23T18:02:29.020+07'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Hangmans', null, {});
  }
};
