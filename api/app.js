require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter.js");
const questionRouter = require("./routes/questionRouter.js");

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.DB;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);

mongoose
  .connect(db, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
  })
  .then(() => {
    console.log("Successfully Connected to Database."),
      app.listen(port, () => {
        console.log("Live on Port", port);
      });
  });

module.exports = {
  path: "/api",
  handler: app
};
