require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log("Live on Port", port);
});

module.exports = {
  path: "/api",
  handler: app
};
