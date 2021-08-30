const labelModel = require('../models/label');

class LabelService {
  /**
      * @description function written to create label
      * @param {*} labelData
      * @returns data else returns error
      */
  async createLabel (labelData) {
    try {
      return await labelModel.createLabel(labelData);
    } catch (error) {
      return error;
    }
  }

  getAllLabels (callback) {
    labelModel.getAllLabels((error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  }

  labelById (labelId, callback) {
    labelModel.labelById(labelId, (error, Data) => {
      return error ? callback(error, null) : callback(null, Data);
    });
  }
}

module.exports = new LabelService();
