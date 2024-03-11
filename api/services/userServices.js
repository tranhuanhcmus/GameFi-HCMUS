const db = require('../config.js');
const crypto = require('crypto');
const axios = require('axios');

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

const getInfoFromTokenURI = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
}

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

module.exports = {
  getNFTbyOwner,
  getTokenURIData,
  createTokenURI,
  updateTokenURI,

};
