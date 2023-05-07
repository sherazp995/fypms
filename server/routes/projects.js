const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const path = require("path");
const fs = require("fs");

function uploadFile (file, username) {
  const fileData = Buffer.from(file, 'base64');
  const fileName = `${username}-${Date.now()}.pdf`;
  const dir = path.join(__dirname, '..', 'uploads', 'projects');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFile(path.join(dir, fileName), fileData, (error) => {
    if (error) {
      console.error('Error saving file:', error);
      return false;
    }
  });
  return fileName;
}
router.get('/all', async (req, res) => {
  try {
    let result = await Project.find();
    res.status(200).json({ result, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post("/create", async (req, res) => {
  try {
    let project = req.body.project;
    let user = req.body.user;
    let result = await Project.findOne({ title: project.title });
    let message = '';
    if (result) {
      message = "Project already exists"
    } else {
      message = 'Project Created Successfully!';
      project.project_file = project.project_file ? uploadFile(project.project_file, user.username) : '';
      project.supervisorId = user._id;
      result = await Project.create(project);
    }
    res.status(200).json({result, message});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Project.deleteOne(req.params.id);
    res.status(200).json({ message: 'Project Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    let project = req.body;
    let result = await Project.findByIdAndUpdate(req.params.id, {
      $set: project
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
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    let result = await Project.findOne({ _id: req.params.id });
    console.log(result)
    res.status(200).json({ result, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;