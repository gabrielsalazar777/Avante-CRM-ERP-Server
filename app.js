var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const projectRouter = require("./routes/projects");
const clientRouter = require("./routes/clients");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.enable("trust proxy");

app.use(
  cors({
    origin: ["http://localhost:3000"], // <== URL of our future React app
  })
);

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/projects", projectRouter);
app.use("/clients", clientRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
