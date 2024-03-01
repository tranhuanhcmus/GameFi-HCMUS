const db = require('../config.js');
const crypto = require('crypto');

const getNFTbyOwner = async (owner) => {
  try {
    const result = await db.query(
      'SELECT * FROM K20_GameFi_DATN_HCMUS.NFT WHERE OWNER = $1',
      [owner]
    );
    console.log(`Lấy NFT ${owner} thành công: `, result.rows);
    return result.rows;
  } catch (error) {
    console.log('Lấy NFT không thành công:', error.message);
    // throw error;
  }
};


module.exports = {
  getNFTbyOwner
};
