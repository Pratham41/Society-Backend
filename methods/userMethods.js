import dbConnection from '../config/db.js';
import async from 'async';

export function fetchMobile(mobileNo, callback) {
  async.waterfall(
    [
      function (callback) {
        const checkMobile = `SELECT mobile from users WHERE mobile=${mobileNo}`;
        dbConnection.getConnection(function (err, connection) {
          connection.query(checkMobile, function (err, result) {
            console.log(err, result);
            if (err) callback(err);
            else {
              callback(null, result);
            }
          });
        });
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

//SELECT mobile from users WHERE mobile=${mobile};

export function registerUser(
  name,
  email,
  mobile,
  username,
  password,
  callback
) {
  async.waterfall(
    [
      function (callback) {
        const registerQuery = `INSERT INTO users(name,email,mobile,username,password) VALUES('${name}','${email}',${mobile},'${username}','${password}') `;
        dbConnection.getConnection(function (err, connection) {
          connection.query(registerQuery, function (err, result) {
            console.log(err, result);
            if (err) callback(err);
            else {
              callback(null, result);
            }
          });
        });
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}

//check whether username exist

export function fetchUsernamePassword(
  username,

  callback
) {
  async.waterfall(
    [
      function (callback) {
        const checkUserQuery = `SELECT username,password from users WHERE username='${username}'`;
        dbConnection.getConnection(function (err, connection) {
          connection.query(checkUserQuery, function (err, result) {
            console.log(err, result);

            if (err) callback(err);
            else {
              callback(null, result);
            }
          });
        });
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
}
