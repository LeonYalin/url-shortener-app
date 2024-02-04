import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom.error";

export function errorHandling(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.status).send({ errors: err.array() });
  }
  res.status(400).send("Something went wrong! " + err.message);
}
