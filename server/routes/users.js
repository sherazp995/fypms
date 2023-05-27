const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {sign} = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const passwordHash = require('password-hash');

function saveImage (image, username) {
  const imageData = Buffer.from(image, 'base64');
  const fileName = `${username}-${Date.now()}.jpg`;
  const dir = path.join(__dirname, '..', 'uploads', 'userImages');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFile(path.join(dir, fileName), imageData, (error) => {
    if (error) {
      console.error('Error saving image:', error);
      return false;
    }
  });
  return fileName;
}

router.get('/all', async (req, res) => {
  let result = await User.find()
  res.json({ status: 200, result })
});

router.get('/:id', async (req, res) => {
  console.log(req.params)
  let result = await User.findOne({ _id: req.params.id })
  res.json({ status: 200, result })
});

router.get('/students_by_project/:id', async (req, res) => {
  let result = await User.find({ project: req.params.id })
  res.json({ status: 200, result })
});

router.post("/register", async (req, res) => {
  try {
    let user = req.body.user;
    let result = await User.findOne({ email: user.email });
    let message = '';
    if (result) {
      message = 'User Already Exist!';
    }
    else {
      user.username = user.email.split('@')[0];
      user.password = passwordHash.generate(user.password);
      user.image = saveImage(req.body.image, user.username);
      result = await User.create(user);
      message = 'User Created Successfully!';
    }
    res.json({ status: 200, result, message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(req.params.id, { $set: { status: 2 } }, { new: true });
    res.json({ status: 200, result, message: 'User Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    let user = req.body.user;
    if (user.password) {
      user.password = passwordHash.generate(user.password);
    }
    let result = await User.findByIdAndUpdate(req.params.id, {
      $set: user
    }, { new: true });
    res.json({ status: 200, result, message: 'User Updated Successfully' });
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
    res.json({ status: 200, result, message: 'User Activated Successfully' });
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
        let jwtToken = sign({ _id: result["_id"] }, process.env.privateKey);
        res.json({ status: 200, result, jwtToken, message: 'Successfully logged in' });
      }
      else {
        res.json({ status: 500, message: 'Incorrect password' });
      }
    }
    else {
      res.json({ status: 500, message: 'User does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
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