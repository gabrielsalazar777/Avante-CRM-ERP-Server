const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    //   required: true,
      default: false,
    },
    projectType: {
      type: [String],
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = model("Project", projectSchema);
