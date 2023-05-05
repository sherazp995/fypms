const express = require('express');
var router = express.Router();
var Project = require('../models/project');

function normalize_values(data) {
  for (let key in data) {
    if (typeof data[key] === "object") {
      data[key] = data[key].map(val => val.value).join(",")
    }
  }
  return data
}
router.get('/', (req, res) => {
  res.send({ Project: 'index' })
});

router.post("/create", async (req, res) => {
  try {
    let result = await Project.findOne({ title: req.body.project.title });
    let message = '';
    if (result) {
      message = "Project already exists"
    } else {
      message = 'Project Created Successfully!';
      result = await Project.create(normalize_values(req.body.project));
      result.supervisorId = req.body.user._id;
      result.save();
    }
    res.status(200).json({result, message});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    let result = await Project.findByIdAndUpdate(req.params.id, { $set: { status: 2 } }, { new: true });
    res.status(200).json({ result, message: 'Project Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    let body = req.body;
    let result = await Project.findByIdAndUpdate(req.params.id, {
      $set: body
    }, { new: true });
    res.status(200).json({ result, message: 'User Updated Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/project_by_supervisor/:id', async (req, res) => {
  try {
    let result = await Project.find({ supervisorId: req.params.id });
    res.status(200).json({ result, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing went wrong' });
  }
});

router.get('/get_one_project/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    let result = await Project.findOne({ _id: req.params.id });
    console.log(result)
    res.status(200).json({ result, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing went wrong' });
  }
});

router.get('/all', async (req, res) => {
  try {
    let result = await Project.find();
    res.status(200).json({ result, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing went wrong' });
  }
});

module.exports = router;