import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
  status = 404;

  constructor() {
    super("Not found");
  }

  array() {
    return [{ msg: "Not found" }];
  }
}
