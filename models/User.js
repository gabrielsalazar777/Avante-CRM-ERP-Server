const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Employee",
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = model("User", userSchema);
