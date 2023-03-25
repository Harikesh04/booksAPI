import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter book title"],
  },
  author: {
    type: String,
    required: [true, "Please enter author's name "],
  },
  description: {
    type: String,
    required: [true, "Please enter book's description "],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
