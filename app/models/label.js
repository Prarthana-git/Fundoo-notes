const mongoose = require('mongoose');
const LabelSchema = new mongoose.Schema({
  labelName: {
    type: String,
    required: true
  },
  notesId: {
    type: String
  },
  labels: {
    type: [String]
  }
}, {
  timestamps: true
});

const LabelModel = mongoose.model('Label', LabelSchema);
class LabelsModel {
  async createLabel (labelData) {
    try {
      const label = new LabelModel({
        labelName: labelData.labelName,
        notesId: labelData.notesId
      });
      return await label.save({});
    } catch (error) {
      return error;
    }
  }

  getAllLabels (callback) {
    LabelModel.find({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }

  labelById (labelId, callback) {
    LabelModel.findById(labelId, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }
}
module.exports = new LabelsModel();
