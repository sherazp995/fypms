const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');
const path = require("path");
const fs = require("fs");

const UploadDIR = path.join(__dirname, '..', 'uploads', 'projects');

function uploadFile (file, username) {
  let filename = '', filePath = '';
  if(file){
    filename = `${username}-${Date.now()}${file.name.match(/\.[0-9a-z]+$/i)}`;
    filePath = path.join(UploadDIR, filename);
    file.mv(filePath, (err)=>{
      if(err){
        console.log(err)
      }
    });
  }
  return filename;
}
router.get('/all', async (req, res) => {
  try {
    let result = await Project.find();
    res.json({ status: 200, result });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong' });
  }
});

router.post("/create", async (req, res) => {
  try {
    let file = req.files.project_file;
    let project = req.body;
    let user = await User.findOne({_id: project.supervisor})
    let filename = uploadFile(file, user.username)
    let result = await Project.findOne({ title: project.title });
    let message = '';
    if (result) {
      message = "Project already exists"
    } else {
      message = 'Project Created Successfully!';
      project.project_file = filename;
      result = await Project.create(project);
    }
    res.json({status: 200, message});
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong', error });
  }
});

router.post("/select", async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.body.user_id, { $set: { project: req.body.project_id } }, { new: true })
    res.json({status: 200, user, message: "Project selected Successfully"});
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong', error });
  }
});

router.post('/delete', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.body.id);
    res.json({ status: 200, message: 'Project Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    let file = req.files.project_file;
    let project = req.body;
    if (project.project_file){
      fs.unlinkSync(path.join(UploadDIR, project.project_file));
    }
    let filename = uploadFile(file, user.username);
    project.project_file = filename;
    let result = await Project.findByIdAndUpdate(req.params.id, {
      $set: project
    }, { new: true });
    res.json({ status: 200, result, message: 'User Updated Successfully' });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong' });
  }
});

router.get('/project_by_supervisor/:id', async (req, res) => {
  try {
    let result = await Project.find({ supervisorId: req.params.id });
    res.json({ status: 200, result });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let result = await Project.findOne({ _id: req.params.id });
    res.json({ status: 200, result });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong' });
  }
});

module.exports = router;