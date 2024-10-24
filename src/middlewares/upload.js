import path from "path"
import multer from "multer"

// Configure storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('File destination:', 'uploads/'); // Debugging line
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log('File name:', `${file.fieldname}-${Date.now()}${ext}`); // Debugging line
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

// Initialize multer with the defined storage configuration
export const upload = multer({ storage });

