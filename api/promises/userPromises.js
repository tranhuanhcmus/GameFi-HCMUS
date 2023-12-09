const db = require('../config.js');
const crypto = require('crypto');

const authenticateUser = async (userMail, userPass) => {
  return new Promise((resolve, reject) => {
    // Hash the input password using SHA256
    const hashedPassword = crypto.createHash('sha256').update(userPass).digest('hex');

    // Execute the logic of AuthenticateUser stored procedure
    db.query(
      'SELECT ACC FROM K20_GameFi_DATN_HCMUS.ACCOUNT WHERE MAIL = $1 AND PASS = $2',
      [userMail, hashedPassword],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve({ message: results[0].ACC });
          } else {
            resolve({ message: 'Email hoặc mật khẩu không đúng' });
          }
        }
      }
    );
  });
};

const getUser = async (userAcc) => {
  return new Promise((resolve, reject) => {
    // Execute the logic of GetUser stored procedure
    db.query(
      'SELECT MAIL, TEL, PASS, IGNAME, AVA, ACC FROM K20_GameFi_DATN_HCMUS.ACCOUNT WHERE ACC = $1',
      [userAcc],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const addUser = async (userMail, userTel, userPass, userIGName, userAva, userAcc) => {
  return new Promise((resolve, reject) => {
    // Hash the input password using SHA256
    const hashedPassword = crypto.createHash('sha256').update(userPass).digest('hex');

    // Check if email already exists in the USER table
    db.query(
      'SELECT 1 FROM K20_GameFi_DATN_HCMUS.ACCOUNT WHERE MAIL = $1',
      [userMail],
      (checkError, checkResults) => {
        if (checkError) {
          reject(checkError);
        } else {
          if (checkResults.length > 0) {
            resolve({ message: 'Email đã được sử dụng' });
          } else {
            // Execute the logic of AddUser stored procedure
            db.query(
              'INSERT INTO K20_GameFi_DATN_HCMUS.ACCOUNT (MAIL, TEL, PASS, IGNAME, AVA, ACC) VALUES ($1, $2, $3, $4, $5, $6)',
              [userMail, userTel, hashedPassword, userIGName, userAva, userAcc],
              (insertError, insertResults) => {
                if (insertError) {
                  reject(insertError);
                } else {
                  resolve({ message: 'Tạo tài khoản thành công' });
                }
              }
            );
          }
        }
      }
    );
  });
};

const updateUser = async (userMail, userTel, userPass, userIGName, userAva, userAcc) => {
  return new Promise((resolve, reject) => {
    // Hash the input password using SHA256
    const hashedPassword = crypto.createHash('sha256').update(userPass).digest('hex');

    // Execute the logic of UpdateUser stored procedure
    db.query(
      'UPDATE K20_GameFi_DATN_HCMUS.ACCOUNT SET TEL = $1, PASS = $2, IGNAME = $3, AVA = $4, ACC = $5 WHERE MAIL = $6',
      [userTel, hashedPassword, userIGName, userAva, userAcc, userMail],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ message: 'Cập nhật thông tin thành công' });
        }
      }
    );
  });
};

module.exports = {
  authenticateUser,
  getUser,
  addUser,
  updateUser,
};
