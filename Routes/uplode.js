const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.mp4', '.pdf', '.xlsx', '.xls'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true);  
  } else {
    cb(new Error('Invalid file type. Allowed types: ' + allowedFileTypes.join(', ')), false);
  }
};

const minFileSize = 5 * 1024 * 1024; 

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: minFileSize,
  },
});

router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

module.exports = router;
