const express = require('express');
const router = express.Router();
const Document = require('../models/document');
const path = require("path");

const UploadDIR = path.join(process.env.ROOT_PATH, 'uploads', 'documents');

function uploadFile (file) {
  console.log(file)
  let fileName = '', filePath = '';
  if(file){
    fileName = `document-${Date.now()}${file.name.match(/\.[0-9a-z]+$/i)}`;
    filePath = path.join('uploads', 'documents', fileName);
    file.mv(path.join(UploadDIR, fileName), (err)=>{
      if(err){
        console.log(err)
      }
    });
  }
  return {fileName: file.name, filePath: ('/' + filePath)};
}

// Create a Document
router.post('/create', async (req, res) => {
  try {
    const doc = req.body;
    let file = req.files.document;
    const {fileName, filePath} = uploadFile(file);
    doc.name = fileName;
    doc.path = filePath;
    doc.user = req.headers.accessid;
    if(!doc.group){
      delete doc.group;
    }
    const document = new Document(doc);
    const savedDocument = await document.save();
    res.json({result: savedDocument});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Documents
router.get('/all', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json({result: documents});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/find', async (req, res) => {
  try {
    const documents = await Document.find(req.body);
    res.json({result: documents});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a Document by ID
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({result: document});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Document
router.post('/update/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({result: document});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Document
router.post('/delete/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
