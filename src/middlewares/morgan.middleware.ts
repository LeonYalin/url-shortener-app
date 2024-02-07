import morgan from "morgan";
import { logger } from "../services/logger";

const morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (msg) => logger.http(msg),
    },
    skip: () => process.env.NODE_ENV !== "development",
  }
);

export { morganMiddleware };
