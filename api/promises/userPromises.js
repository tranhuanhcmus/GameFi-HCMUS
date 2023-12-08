const db = require('../config.js');

const callAuthenticateUser = async (userMail, userPass) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL K20_GameFi_DATN_HCMUS.AuthenticateUser(?, ?)',
      [userMail, userPass],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0][0]);
        }
      }
    );
  });
};

const callGetUser = async (userAcc) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL K20_GameFi_DATN_HCMUS.GetUser(?)',
      [userAcc],
      (error, results) => {
        if (error) {
          reject(error);
          // console.log(error);
        } else {
          resolve(results[0]);
          // console.log(results);
        }
      }
    );
  });
};

const callAddUser = async (userMail, userTel, userPass, userIGName, userAva, userAcc) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL K20_GameFi_DATN_HCMUS.AddUser(?, ?, ?, ?, ?, ?)',
      [userMail, userTel, userPass, userIGName, userAva, userAcc],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0][0]);
        }
      }
    );
  });
};

const callUpdateUser = async (userMail, userTel, userPass, userIGName, userAva, userAcc) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL K20_GameFi_DATN_HCMUS.UpdateUser(?, ?, ?, ?, ?, ?)',
      [userMail, userTel, userPass, userIGName, userAva, userAcc],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0][0]);
        }
      }
    );
  });
};

module.exports = {
  callAuthenticateUser,
  callGetUser,
  callAddUser,
  callUpdateUser,
};
