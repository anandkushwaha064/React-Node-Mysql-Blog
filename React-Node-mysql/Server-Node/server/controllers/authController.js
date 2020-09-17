var express = require('express');
var router = express.Router();
const Users = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const dbconnnectivity = require('../dbconnection');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

exports.signUp = async (req, res) => {
  let {email, password, blogname, name} = req.body;
  if (!req.body) {
    res.json({
      message: 'Please fill in all required fields',
      success: false,
    });
  }
  req.body.email = email.toLowerCase();
  const user = await Users.create(req.body);
  if (user) {
    req.body.password = undefined;
    const token = await jwt.sign(req.body, process.env.JWT_SECRET);
    res.json({
      message: 'successful!',
      success: true,
      token: token,
    });
  }
};

exports.signIn = async (req, res) => {
  const {email, password} = req.body;

  // console.log(res);
  // this.setState({ redirect: true })
  if (password == '') {
    dbconnnectivity.query(
      `select * from users where userid = '${email}'`,
      function (err, response) {
        // console.log(response.length);
        if (err) res.status(500).send({error: 'Something Worng'});
        if (response.length < 0) {
          res.json({
            success: false,
            message: 'User not found!',
          });
        } else {
        }
      }
    );
  } else {
    dbconnnectivity.query(
      `select * from users where userid = '${email}' and PWD = '${password}'`,
      function (err, response) {
        // const useridtoken = await jwt.sign(req.body, process.env.JWT_SECRET)
        if (err) res.status(500).send({error: 'Something Worng'});
        if (response.length > 0) {
          res.status(200).json({
            token: 'Okay',
            message: 'Sign in successful!',
            success: true,
          });
        } else {
          res.json({
            message: 'Invalid login details!',
            success: false,
          });
        }
      }
    );
  }
};
