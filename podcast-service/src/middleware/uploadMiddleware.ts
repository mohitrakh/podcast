import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads/audio';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

// file filter (only allow audio)
const fileFilter = (req: any, file: any, cb: any) => {
    console.log(`Filtering file: ${file.originalname}, mimetype: ${file.mimetype}`);
    if (file.mimetype.startsWith('audio/') || file.originalname.match(/\.(mp3|wav|m4a|ogg)$/i)) {
        cb(null, true);
    } else {
        cb(new Error('Only audio files are allowed. Received: ' + file.mimetype), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 250 * 1024 * 1024, // 250MB limit (adjust as needed)
    },
});

export default upload;