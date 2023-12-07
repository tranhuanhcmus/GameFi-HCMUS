const db = require('../config.js');

const callAuthenticateUser = async (userTel, userPass) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.AuthenticateUser($1, $2)',
      [userTel, userPass],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
        }
      }
    );
  });
};

const callGetUser = async (userTel) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.GetUser($1)',
      [userTel],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const callAddUser = async (userTel, userPass, userName, userAva) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.AddUser($1, $2, $3, $4)',
      [userTel, userPass, userName, userAva],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
        }
      }
    );
  });
};

const callUpdateUser = async (userTel, userPass, userName, userAva, userVIP) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.UpdateUser($1, $2, $3, $4, $5)',
      [userTel, userPass, userName, userAva, userVIP],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
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
