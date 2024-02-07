import { app } from "./app";
import mongoose from "mongoose";
import { DbConnectionError } from "./errors/db_connection.error";
import { logger } from "./services/logger";

const PORT = process.env.PORT || 3000;
const mongoUrl =
  "mongodb+srv://url_shortener_db_admin:root@cluster0.xklmrbb.mongodb.net/url_shortener_db";

(async function main() {
  try {
    await mongoose.connect(mongoUrl);
    logger.info("Connected to MongoDb");
  } catch (e: any) {
    throw new DbConnectionError(e);
  }

  app.listen(PORT, () => {
    logger.info("server running on port " + PORT);
  });
})();
