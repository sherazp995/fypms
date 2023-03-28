const express = require('express');
var router = express.Router();
var Project = require('../models/project');

router.get('/', (req, res) => {
  res.send({ Project: 'index' })
});

router.post("/create", async (req, res) => {
  try {
    let result = await Project.findOne({ email: req.body.title });
    console.log(req.body)
    let message = '';
    message = 'Project Created Successfully!';
    result = await Project.create(req.body);
    res.status(200).json({ result, message });
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

router.get('/:id', async (req, res) => {
  try {
    let result = await Project.find({ supervisorId: req.params.id });
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