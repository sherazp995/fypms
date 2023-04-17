const express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
const auth = require("../middleware/authentication");

router.get('/', (req, res) => {
  res.send({ User: 'index'})
});

router.post("/register", async (req, res) => {
  try {
    let result = await User.findOne({ email: req.body.email });
    let message = '';
    if (result) {
      message = 'User Already Exist!';
    }
    else {
      message = 'User Created Successfully!';
      result = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.email.split('@')[0],
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        role: req.body.role
      });
    }
    res.json({ result, message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(req.params.id, { $set: { status: 2 } }, { new: true });
    res.status(200).json({ result, message: 'User Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    let body = req.body;
    if (body.password) {
      body.password = passwordHash.generate(req.body.password);
    }
    let result = await User.findByIdAndUpdate(req.params.id, {
      $set: body
    }, { new: true });
    res.status(200).json({ result, message: 'User Updated Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/verify/:id', async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(req.params.id, {
      $set: { status: 1 }
    }, { new: true });
    res.status(200).json({ result, message: 'User Activated Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    let result = await User.findOne({ username: req.body.username });

    if (result) {
      if (passwordHash.verify(req.body.password, result.password)) {
        let jwtToken = jwt.sign({ _id: result._id }, process.env.privateKeyForLoginSignup);
        res.json({ result, jwtToken: jwtToken, message: 'Authorized' });
      }
      else {
        res.status(500).json({ message: 'Not Authorized' });
      }
    }
    else {
      res.status(500).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing went wrong' });
  }
});

// router.post('/logout', async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(req.body._id, { $pull: { fcmToken: req.body.fcmToken } });
//     res.json({ message: 'Success' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error });
//   }
// });

module.exports = router;