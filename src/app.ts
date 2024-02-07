import express from "express";
import "express-async-errors";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import session from "express-session";
import { indexRoutes } from "./routes/index.routes";
import path from "path";
import { linkRoutes } from "./routes/link.routes";
import { errorHandling } from "./middlewares/error_handling.middleware";
import { shortRoutes } from "./routes/short.routes";
import { NotFoundError } from "./errors/not_found.error";
import { morganMiddleware } from "./middlewares/morgan.middleware";

const app = express();

app.use(methodOverride("_method"));
app.use(morganMiddleware);
app.use(cookieParser());
app.use(
  session({ secret: "my secret", resave: true, saveUninitialized: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/scripts", express.static(path.join(__dirname, "..", "node_modules")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(indexRoutes);
app.use("/links", linkRoutes);
app.use("/s", shortRoutes);
app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandling);

export { app };
