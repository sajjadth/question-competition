const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, min: 3, required: true },
    lastName: { type: String, min: 3, required: true },
    fullName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    point: {type: Number, default: 0}
  },
  { timeStamps: true, collection: "users" }
);

module.exports = mongoose.model("users", userSchema);
