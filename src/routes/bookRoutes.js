import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadBook } from "../controllers/booksController.js";
const router = express.Router();

// Route to handle book upload
router.post("/book-upload", upload.single("bookCover", "bookPdf"), uploadBook);

export default router;
