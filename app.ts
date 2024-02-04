import express from "express";
import "express-async-errors";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import session from "express-session";
import { indexRoutes } from "./src/routes/index.routes";
import path from "path";
import { linkRoutes } from "./src/routes/link.routes";
import { errorHandling } from "./src/middlewares/error_handling.middleware";
import { shortRoutes } from "./src/routes/short.routes";

const app = express();

app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({ secret: "my secret", resave: true, saveUninitialized: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/scripts", express.static(path.join(__dirname, "node_modules")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));

app.use(indexRoutes);
app.use("/link", linkRoutes);
app.use("/s", shortRoutes);
app.all("*", (req, res) => {
  res.redirect("/");
});
app.use(errorHandling);

export { app };
