const { model, Schema } = require("mongoose");

const clientSchema = new Schema(
  {
    
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = model("Client", clientSchema);
