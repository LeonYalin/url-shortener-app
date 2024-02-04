import { CustomError } from "./custom.error";

export class BadRequestError extends CustomError {
  status = 400;

  constructor(public msg: string) {
    super(msg);
  }

  array() {
    return [{ msg: this.msg }];
  }
}
