import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";

  //wrong mongo db id error{when id is wrong}
  if (err.name === "CastError") {
    const message = `Resourse not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Moongoose dublicate key errors
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    // ${Object.keys(err.keyValue)} this will see accordingly that what is duplicate
    err = new ErrorHandler(message, 400);
  }
  

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  
  });
};
