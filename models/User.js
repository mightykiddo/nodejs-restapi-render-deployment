const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: String,
    user_id: Number,
    telegram: String,
    password: String,
    inactive: Boolean,
    alert: Boolean,
  },
  
);

module.exports = mongoose.model("User", userSchema);