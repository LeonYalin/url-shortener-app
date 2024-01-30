import express from "express";
import { indexRoutes } from "./src/routes/index.routes";
import path from "path";

const app = express();

app.use(express.static("public"));
app.use("/scripts", express.static(path.join(__dirname, "node_modules")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));

app.use(indexRoutes);

export { app };
