// server.js
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// AWS S3 configuration
const S3_BUCKET = 'my-cool-local-bucket12'; // change this
AWS.config.update({ region: 'us-east-1' }); // e.g., 'us-east-1'

const s3 = new AWS.S3();

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname))); // serves your upload.html

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Read the file content
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: S3_BUCKET,
    Key: file.originalname,
    Body: fileStream,
  };

  s3.upload(params, (err, data) => {
    // Clean up the local temp file
    fs.unlink(file.path, () => {});

    if (err) {
      console.error('S3 upload error:', err);
      return res.status(500).json({ error: 'Failed to upload to S3' });
    }

    res.json({ message: 'File uploaded successfully', location: data.Location });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
