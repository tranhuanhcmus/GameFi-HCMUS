const db = require('../config.js');
const crypto = require('crypto');
const axios = require('axios');
const { getInfoFromTokenURI } = require('../controllers/ContractController.js');

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

const updateNFTOwner = async (tokenid, to) => {
  try {
    console.log(tokenid, to);
    // Execute the logic of updating NFT ownership
    await db.query(
      'UPDATE K20_GameFi_DATN_HCMUS.NFT SET OWNER = $2 WHERE TOKENID = $1',
      [tokenid, to]
    );
    console.log('Cập nhật NFT OWNER thành công');
    return { message: 'Cập nhật NFT OWNER thành công', apiCode: 200 };
  } catch (error) {
    console.error('Cập nhật NFT OWNER không thành công', error);
    return { message: 'Lỗi khi cập nhật NFT OWNER', apiCode: 500 };
  }
};

const updateNFTExp = async (tokenid, exp) => {
  try {
    console.log(tokenid, exp);
    // Execute the logic of updating NFT ownership
    await db.query(
      'UPDATE K20_GameFi_DATN_HCMUS.NFT SET EXP = $2 WHERE TOKENID = $1',
      [tokenid, exp]
    );
    console.log('Cập nhật NFT EXP thành công');
    return { message: 'Cập nhật NFT EXP thành công', apiCode: 200 };
  } catch (error) {
    console.error('Cập nhật NFT EXP không thành công', error);
    return { message: 'Lỗi khi cập nhật NFT EXP', apiCode: 500 };
  }
};


const getAllTokenURIData = async () => {
    try {
        const result = await db.query(
            'SELECT DATA FROM K20_GameFi_DATN_HCMUS.TOKENURI'
        );
        if (result.rows.length > 0) {
            const data = result.rows[0].data;
            console.log('Lấy dữ liệu từ TOKENURI thành công');
            return { data: result.rows, message: 'Lấy dữ liệu từ TOKENURI thành công', apiCode: 200 };
        } else {
            console.log('Không tìm thấy dữ liệu cho TOKENURI:', tokenURI);
            return { message: 'Không tìm thấy dữ liệu cho TOKENURI', apiCode: 404 };
        }
    } catch (error) {
        console.log('Lỗi khi lấy dữ liệu từ TOKENURI:', error.message);
        return { message: 'Lỗi khi lấy dữ liệu từ TOKENURI', apiCode: 500 };
    }
};

const getTokenURIData = async (tokenURI) => {
    try {
        const result = await db.query(
            'SELECT DATA FROM K20_GameFi_DATN_HCMUS.TOKENURI WHERE TOKENURI = $1',
            [tokenURI]
        );
        if (result.rows.length > 0) {
            const data = result.rows[0].data;
            console.log('Lấy dữ liệu từ TOKENURI thành công');
            return { data, message: 'Lấy dữ liệu từ TOKENURI thành công', apiCode: 200 };
        } else {
            console.log('Không tìm thấy dữ liệu cho TOKENURI:', tokenURI);
            return { message: 'Không tìm thấy dữ liệu cho TOKENURI', apiCode: 404 };
        }
    } catch (error) {
        console.log('Lỗi khi lấy dữ liệu từ TOKENURI:', error.message);
        return { message: 'Lỗi khi lấy dữ liệu từ TOKENURI', apiCode: 500 };
    }
};

const createTokenURI = async (tokenURI) => {
    try {
        // Kiểm tra xem tokenURI đã tồn tại trong bảng TOKENURI chưa
        const checkResult = await db.query(
            'SELECT COUNT(*) FROM K20_GameFi_DATN_HCMUS.TOKENURI WHERE TOKENURI = $1',
            [tokenURI]
        );
        const existingRecordCount = parseInt(checkResult.rows[0].count);

        if (existingRecordCount > 0) {
            console.log('TokenURI đã tồn tại trong cơ sở dữ liệu.');
            return { message: 'TokenURI đã tồn tại trong cơ sở dữ liệu.', apiCode: 409 };
        }

        // Nếu tokenURI chưa tồn tại, tiến hành thêm mới
        const data = await getInfoFromTokenURI(tokenURI);
        if (data != null) {
            await db.query(
                'INSERT INTO K20_GameFi_DATN_HCMUS.TOKENURI (TOKENURI, DATA) VALUES ($1, $2)',
                [tokenURI, data]
            );
            console.log('Tạo TOKENURI thành công');
            return { message: 'Tạo TOKENURI thành công', apiCode: 200 };
        } else {
            console.log('Không có dữ liệu từ URL.');
            return { message: 'Không có dữ liệu từ URL.', apiCode: 404 };
        }
    } catch (error) {
        console.log('Lỗi khi tạo mới TOKENURI:', error.message);
        return { message: 'Lỗi khi tạo mới TOKENURI', apiCode: 500 };
    }
};

const updateTokenURI = async (tokenURI) => {
    try {
        const data = await getInfoFromTokenURI(tokenURI);
        if (data != null) {
            const result = await db.query(
                'UPDATE K20_GameFi_DATN_HCMUS.TOKENURI SET DATA = $1 WHERE TOKENURI = $2',
                [data, tokenURI]
            );
            if (result.rowCount > 0) {
                console.log('Cập nhật TOKENURI thành công');
                return { message: 'Cập nhật TOKENURI thành công', apiCode: 200 };
            } else {
                console.log('Không tìm thấy TOKENURI để cập nhật');
                return { message: 'Không tìm thấy TOKENURI để cập nhật', apiCode: 404 };
            }
        } else {
            console.log('Không có dữ liệu từ URL.');
            return { message: 'Không có dữ liệu từ URL.', apiCode: 404 };
        }
    } catch (error) {
        console.log('Lỗi khi cập nhật TOKENURI:', error.message);
        return { message: 'Lỗi khi cập nhật TOKENURI', apiCode: 500 };
    }
};

const getItemGame = async () => {
    try {
        const result = await db.query(
            'SELECT * FROM K20_GameFi_DATN_HCMUS.ItemGame'
        );
        return { message: result.rows.length > 0 ? 'Lấy thông tin ItemGame thành công' : 'Không tìm thấy ItemGame', apiCode: result.rows.length > 0 ? 200 : 404 };
    } catch (error) {
        return { message: 'Lấy thông tin ItemGame không thành công', apiCode: 500 };
    }
};

const getItemGameById = async (itemId) => {
    try {
        const result = await db.query(
            'SELECT * FROM K20_GameFi_DATN_HCMUS.ItemGame WHERE ItemGameId = $1',
            [itemId]
        );
        return { message: result.rows.length > 0 ? 'Lấy thông tin ItemGame thành công' : 'Không tìm thấy ItemGame', apiCode: result.rows.length > 0 ? 200 : 404 };
    } catch (error) {
        return { message: 'Lấy thông tin ItemGame không thành công', apiCode: 500 };
    }
};

const getItemApp = async () => {
    try {
        const result = await db.query(
            'SELECT * FROM K20_GameFi_DATN_HCMUS.ItemApp'
        );
        return { message: result.rows.length > 0 ? 'Lấy thông tin ItemApp thành công' : 'Không tìm thấy ItemApp', apiCode: result.rows.length > 0 ? 200 : 404 };
    } catch (error) {
        return { message: 'Lấy thông tin ItemApp không thành công', apiCode: 500 };
    }
};

const getItemAppById = async (itemId) => {
    try {
        const result = await db.query(
            'SELECT * FROM K20_GameFi_DATN_HCMUS.ItemApp WHERE ItemAppId = $1',
            [itemId]
        );
        return { message: result.rows.length > 0 ? 'Lấy thông tin ItemApp thành công' : 'Không tìm thấy ItemApp', apiCode: result.rows.length > 0 ? 200 : 404 };
    } catch (error) {
        return { message: 'Lấy thông tin ItemApp không thành công', apiCode: 500 };
    }
};

const createItemGame = async (name, description, category, quality, gemcost, goldcost, HP, attack, def, duration) => {
    try {
        const result = await db.query(
            'INSERT INTO K20_GameFi_DATN_HCMUS.ItemGame (name, description, category, quality, gemcost, goldcost, HP, attack, def, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [name, description, category, quality, gemcost, goldcost, HP, attack, def, duration]
        );
        return { message: 'Tạo mới ItemGame thành công', apiCode: 201 };
    } catch (error) {
        return { message: 'Lỗi khi tạo mới ItemGame', apiCode: 500 };
    }
};

const createItemApp = async (name, description, category, quality, gemcost, goldcost) => {
    try {
        const result = await db.query(
            'INSERT INTO K20_GameFi_DATN_HCMUS.ItemApp (name, description, category, quality, gemcost, goldcost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, category, quality, gemcost, goldcost]
        );
        return { message: 'Tạo mới ItemApp thành công', apiCode: 201 };
    } catch (error) {
        return { message: 'Lỗi khi tạo mới ItemApp', apiCode: 500 };
    }
};

const updateItemGame = async (itemId, name, description, category, quality, gemcost, goldcost, HP, attack, def, duration) => {
    try {
        const result = await db.query(
            'UPDATE K20_GameFi_DATN_HCMUS.ItemGame SET name = $1, description = $2, category = $3, quality = $4, gemcost = $5, goldcost = $6, HP = $7, Attack = $8, Def = $9, Duration = $10 WHERE ItemGameId = $11 RETURNING *',
            [name, description, category, quality, gemcost, goldcost, HP, attack, def, duration, itemId]
        );
        return { message: 'Cập nhật thông tin ItemGame thành công', apiCode: 200 };
    } catch (error) {
        return { message: 'Lỗi khi cập nhật thông tin ItemGame', apiCode: 500 };
    }
};

const updateItemApp = async (itemId, name, description, category, quality, gemcost, goldcost) => {
    try {
        const result = await db.query(
            'UPDATE K20_GameFi_DATN_HCMUS.ItemApp SET name = $2, description = $3, category = $4, quality = $5, gemcost = $6, goldcost = $7 WHERE ItemAppId = $1 RETURNING *',
            [itemId, name, description, category, quality, gemcost, goldcost]
        );
        return { message: 'Cập nhật thông tin ItemApp thành công', apiCode: 200 };
    } catch (error) {
        return { message: 'Lỗi khi cập nhật thông tin ItemApp', apiCode: 500 };
    }
};

const getItemGameOwnership = async (owner) => {
    try {
        const result = await db.query(
            'SELECT * FROM K20_GameFi_DATN_HCMUS.ItemGameOwnership WHERE owner = $1',
            [owner]
        );
        return { message: 'Lấy thông tin ItemGameOwnership thành công', apiCode: 200, data: result.rows };
    } catch (error) {
        return { message: 'Lỗi khi lấy thông tin ItemGameOwnership', apiCode: 500 };
    }
};

const getItemAppOwnership = async (owner) => {
    try {
        const result = await db.query(
            'SELECT * FROM K20_GameFi_DATN_HCMUS.ItemAppOwnership WHERE owner = $1',
            [owner]
        );
        return { message: 'Lấy thông tin ItemAppOwnership thành công', apiCode: 200, data: result.rows };
    } catch (error) {
        return { message: 'Lỗi khi lấy thông tin ItemAppOwnership', apiCode: 500 };
    }
};

const createItemGameOwnership = async (itemId, owner, quantity) => {
    try {
        const result = await db.query(
            'INSERT INTO K20_GameFi_DATN_HCMUS.ItemGameOwnership (ItemGameId, owner, quantity) VALUES ($1, $2, $3) RETURNING *',
            [itemId, owner, quantity]
        );
        return { message: 'Tạo mới ItemGameOwnership thành công', apiCode: 201 };
    } catch (error) {
        return { message: 'Lỗi khi tạo mới ItemGameOwnership', apiCode: 500 };
    }
};

const createItemAppOwnership = async (itemId, owner, quantity) => {
    try {
        const result = await db.query(
            'INSERT INTO K20_GameFi_DATN_HCMUS.ItemAppOwnership (ItemAppId, owner, quantity) VALUES ($1, $2, $3) RETURNING *',
            [itemId, owner, quantity]
        );
        return { message: 'Tạo mới ItemAppOwnership thành công', apiCode: 201, data: result.rows };
    } catch (error) {
        console.log('Lỗi khi tạo mới ItemAppOwnership:', error.message);
        throw { message: 'Lỗi khi tạo mới ItemAppOwnership', apiCode: 500 };
    }
};

const updateItemGameOwnership = async (itemId, owner, quantity) => {
    try {
        const result = await db.query(
            'UPDATE K20_GameFi_DATN_HCMUS.ItemGameOwnership SET quantity = $1 WHERE ItemGameId = $2 AND owner = $3 RETURNING *',
            [quantity, itemId, owner]
        );
        return { message: 'Cập nhật thông tin ItemGameOwnership thành công', apiCode: 200, data: result.rows };
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin ItemGameOwnership:', error.message);
        throw { message: 'Lỗi khi cập nhật thông tin ItemGameOwnership', apiCode: 500 };
    }
};

const updateItemAppOwnership = async (itemId, owner, quantity) => {
    try {
        const result = await db.query(
            'UPDATE K20_GameFi_DATN_HCMUS.ItemAppOwnership SET quantity = $1 WHERE ItemAppId = $2 AND owner = $3 RETURNING *',
            [quantity, itemId, owner]
        );
        return { message: 'Cập nhật thông tin ItemAppOwnership thành công', apiCode: 200, data: result.rows };
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin ItemAppOwnership:', error.message);
        throw { message: 'Lỗi khi cập nhật thông tin ItemAppOwnership', apiCode: 500 };
    }
};


module.exports = {
  getNFTbyOwner,
  updateNFTOwner,
  updateNFTExp,
  getAllTokenURIData,
  getTokenURIData,
  createTokenURI,
  updateTokenURI,
  getItemGame,
  getItemGameById,
  getItemApp,
  getItemAppById,
  createItemGame,
  createItemApp,
  updateItemGame,
  updateItemApp,
  getItemGameOwnership,
  getItemAppOwnership,
  createItemGameOwnership,
  createItemAppOwnership,
  updateItemGameOwnership,
  updateItemAppOwnership
};
