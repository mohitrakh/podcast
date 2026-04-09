require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { connect, StringCodec } = require('nats');


const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Rename to avoid collisions: timestamp + random suffix + original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, baseName + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Serve static files
// Files will be accessible at: /media/audio/:filename
app.use('/media/audio', express.static(uploadDir));

// File upload API
app.post('/media/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filename = req.file.filename;
  // Return the configured URL combining base URL and media/audio path
  const fileUrl = `${BASE_URL}/media/audio/${filename}`;

  return res.json({ fileUrl });
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const startNatsListener = async () => {
  try {
    const nc = await connect({ servers: "nats://nats-srv:4222" });
    console.log("Media Service connected to NATS");
    
    const sc = StringCodec();
    const sub = nc.subscribe("episode.created");
    
    (async () => {
      for await (const msg of sub) {
        const data = JSON.parse(sc.decode(msg.data));
        console.log("Media Service received [episode.created]:", data);
      }
    })();
    
  } catch (err) {
    console.error("Error connecting to NATS:", err);
  }
};

app.listen(PORT, () => {
  console.log(`Media Service running at port ${PORT}`);
  startNatsListener();
});

