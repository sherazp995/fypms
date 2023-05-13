const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');
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
    let user = await User.findOne({_id: project.user})
    const filename = path.join(__dirname, '..', 'uploads', 'projects', `${user.username}-${Date.now()}.${file.name.split('.')[1]}`);
    if(file){
      file.mv(filename, (err)=>{
      if(err){
        console.log(err)
      }
    });
    }
    let result = await Project.findOne({ title: project.title });
    let message = '';
    if (result) {
      message = "Project already exists"
    } else {
      message = 'Project Created Successfully!';
      project.project_file = file ? filename : '';
      result = await Project.create(project);
    }
    res.json({status: 200});
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
    let project = req.body;
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
  console.log(req.params.id)
  try {
    let result = await Project.findOne({ _id: req.params.id });
    console.log(result)
    res.json({ status: 200, result });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: 'Something went wrong' });
  }
});

module.exports = router;