const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = model("Project", projectSchema);
