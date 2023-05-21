const { model, Schema } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = model("Client", clientSchema);
