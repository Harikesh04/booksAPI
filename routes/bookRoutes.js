import express from "express";
import { createBook, deleteSingleBook, getAllBook, getAllBooks, getBookDetails, updateBook } from "../controllers/booksController.js";

const router = express.Router();

router.post("/books",createBook);
router.put("/book/:id",updateBook);
router.get("/books",getAllBook);
router.get("/books/features",getAllBooks);
router.get("/book/:id",getBookDetails);
router.delete("/book/:id",deleteSingleBook);


export default router 