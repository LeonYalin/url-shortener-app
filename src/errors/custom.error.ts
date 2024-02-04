export abstract class CustomError extends Error {
  abstract status: number;

  constructor(msg: string) {
    super(msg);
  }

  abstract array(): { msg: string }[];
}
