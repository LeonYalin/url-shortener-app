import "express-session"; // don't forget to import the original module

type FlashType = "info" | "error" | "success";

declare module "express-session" {
  interface SessionData {
    flash: {
      level: FlashType;
      msg: string;
    };
  }
}
