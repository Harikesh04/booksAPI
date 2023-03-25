import express from "express";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDatabase from "./database.js";
import book from "./routes/bookRoutes.js"
import { errorMiddleware } from "./middleware/Error.js";


import path from "path";


app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true })); 


if (process.env.NODE_ENV!=="PRODUCTION") {
    dotenv.config({ path: "config/config.env" });
  }


process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception error`);
  
    process.exit(1);//server getting off  
  });

  connectDatabase();

  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working at http://localhost:${process.env.PORT}`);
  });

  


  app.use("/api/v1", book);

  app.get("/", (req, res) => {
    res.send("Nice working");
  });

  


  process.on("unhandledRejection", (err) => {//unhandledRejection is the name of the event
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  }); 

  app.use(errorMiddleware);//Using this middleware for error handling

//  
















