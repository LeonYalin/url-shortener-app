import express from "express";
import "express-async-errors";
import { indexRoutes } from "./src/routes/index.routes";
import path from "path";
import { urlRoutes } from "./src/routes/link.routes";
import { errorHandling } from "./src/middlewares/error_handling.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/scripts", express.static(path.join(__dirname, "node_modules")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));

app.use(indexRoutes);
app.use("/link", urlRoutes);
app.all("*", (req, res) => {
  res.redirect("/");
});
app.use(errorHandling);

export { app };
