import morgan from "morgan";
import cors from "cors";
import express = require("express");
import { Request, Response, NextFunction } from "express";
import indexRouter from "./routes/indexRouter";
import { DataError } from "./services/utils/errors/customeError";

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(indexRouter);

app.use(
  (err: DataError, req: Request, res: Response, next: NextFunction): void => {
    if (err.statusCode && err.statusCode === 400) {
      res.status(400).json({ error: err.message });
    } else {
      next();
    }
  }
);

export default app;
