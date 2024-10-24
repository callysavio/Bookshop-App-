import mongoose from "mongoose";

// Define mongoose schema
const bookSchema = new mongoose.Schema(
  {
    bookCover: { type: String, required: true },
    bookPdf: { type: String, required: true },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: { type: String, required: true, maxlength: 30 },
    category: {
      type: String,
      required: true,
      enum: ["AI", "Web development", "Mobile development"],
    },
    publicationDate: { type: Date, required: true },
    ISBN: { type: String, required: true },
  },
  { timestamps: true } // Corrected from 'timestamp' to 'timestamps'
);

export const Book = mongoose.model("Book", bookSchema);
