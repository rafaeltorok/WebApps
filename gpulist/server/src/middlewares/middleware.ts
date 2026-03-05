import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import mongoose from "mongoose";

function unknownEndpoint(_req: Request, res: Response) {
  res.status(404).send({ error: "unknown endpoint" });
};

function errorHandler(
  err: Error, _req: Request, res: Response, next: NextFunction
) {
  logger.error(err.message);

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof mongoose.Error.CastError) {
    // Inspect the path to check if the error is caused by an invalid id or specs
    if (err.path === "_id") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

export default { unknownEndpoint, errorHandler };
