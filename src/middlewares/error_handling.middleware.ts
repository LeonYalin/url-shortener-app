import { NextFunction, Request, Response } from "express";

export function errorHandling(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).send("Something went wrong! " + err.message);
}
