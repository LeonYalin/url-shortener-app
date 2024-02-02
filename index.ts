import { app } from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

(async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://url_shortener_db_admin:root@cluster0.xklmrbb.mongodb.net/url_shortener_db"
    );
    console.log("connected to MongoDb");
  } catch (e) {
    console.error("error connecting to MongoDb", e);
  }

  app.listen(PORT, () => {
    console.log("server running on port " + PORT);
  });
})();
