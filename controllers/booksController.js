import { catchAsynError } from "../middleware/catchAsyncError.js";
import Books from "../models/bookModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import ApiFeatures from "../utils/ApiFeatures.js";

export const createBook = catchAsynError(async (req, res, next) => {
  const book = await Books.create(req.body);

  res.status(200).json({
    success: true,
    book,
  });
});

export const updateBook = catchAsynError(async (req, res, next) => {
  let book = await Books.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler("Book not found", 400));
  }

  book = await Books.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    book,
  });
});

export const getAllBook = catchAsynError(async (req, res, next) => {
  const books = await Books.find();
  res.status(200).json({
    success: true,
    books,
  });
});
export const getAllBooks = catchAsynError(async (req, res, next) => {
  const resultPerPage = 6;
  const booksCount = await Books.countDocuments();

  const ApiFeature = new ApiFeatures(Books.find(), req.query)
    .search()
    .filter()
    .sort();
  let books = await ApiFeature.query;

  let filteredProductsCount = books.length;

  ApiFeature.pagination(resultPerPage);

  books = await ApiFeature.query.clone();

  res.status(200).json({
    success: true,
    books,
    booksCount,
    filteredProductsCount,
  });
});

export const getBookDetails = catchAsynError(async (req, res, next) => {
  const book = await Books.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    book,
  });
});

export const deleteSingleBook = catchAsynError(async (req, res, next) => {
  const book = await Books.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: `book has been deleted with id: ${req.params.id}`,
  });
});
