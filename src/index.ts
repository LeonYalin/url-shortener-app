import { app } from "./app";
import mongoose from "mongoose";
import { DbConnectionError } from "./errors/db_connection.error";

const PORT = process.env.PORT || 3000;
const mongoUrl =
  "mongodb+srv://url_shortener_db_admin:root@cluster0.xklmrbb.mongodb.net/url_shortener_db";

(async function main() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDb");
  } catch (e: any) {
    throw new DbConnectionError(e);
  }

  app.listen(PORT, () => {
    console.log("server running on port " + PORT);
  });
})();
