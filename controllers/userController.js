import {
  fetchMobile,
  registerUser,
  fetchUsernamePassword,
} from '../methods/userMethods.js';
import dbConnection from '../config/db.js';

export const userRegister = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const username = req.body.username;
  const password = req.body.password;
  var isUserExist = [];

  fetchMobile(mobile, function (err, mobileNo) {
    if (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    } else {
      isUserExist = mobileNo;
      console.log(`found length ${isUserExist.length}`);
    }

    ////// INSERTING //////////////////////////////////

    if (isUserExist.length == 0) {
      registerUser(
        name,
        email,
        mobile,
        username,
        password,
        function (err, result) {
          if (err) {
            res
              .status(400)
              .json({ status: 'insert fail', message: err.message });
          } else {
            res
              .status(200)
              .json({ status: 'success', message: 'user registerd' });
          }
        }
      );
    } else {
      res.status(200).json({
        status: 'failed',
        message: 'user already exists !',
      });
    }
  });
};

// User Login

export const userLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var teampArray = [];
  fetchUsernamePassword(username, function (err, result) {
    if (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    } else {
      teampArray = result;
    }
    if (teampArray.length > 0) {
      if (password === result[0].password) {
        res
          .status(201)
          .json({
            status: 'success',
            message: 'valid user',
            username: username,
          });
      } else {
        res
          .status(400)
          .json({ status: 'fail', message: 'password is incorrect !' });
      }
    } else {
      res
        .status(400)
        .json({ status: 'fail', message: 'username is incorrect !' });
    }
  });
};
