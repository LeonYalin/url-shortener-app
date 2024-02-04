import { CustomError } from "./custom.error";

export class DbConnectionError extends CustomError {
  status = 500;

  constructor(public msg: string) {
    super("Error connecting to the database. " + msg);
  }

  array() {
    return [{ msg: "Error connecting to the database." + this.msg }];
  }
}
