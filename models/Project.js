const { model, Schema } = require('mongoose');

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
         default: '',
      },
      client: {
         type: Schema.Types.ObjectId,
         ref: 'Client',
         required: true,
      },
      materials: [
         {
            name: { type: String, required: true, default: '' },
            squareFeet: { type: Number, required: true, default: 0 },
            coverage: { type: Number, required: true, default: 0 },
            units: { type: Number, required: true, default: 0 },
         },
      ],
      address: {
         type: String,
         default: '',
      },
      startDate: Date,
      endDate: Date,
      color: {
         type: String,
         default: '#12c946',
      },
   },
   {
      timestamps: true,
      timeseries: true,
   }
);

module.exports = model('Project', projectSchema);
