const { model, Schema } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: String,
    email: String,
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = model("Client", clientSchema);
