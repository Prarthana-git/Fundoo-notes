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

  async updateLabel (labelId, labelData) {
    try {
      return await labelModel.updateLabel(labelId, labelData);
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

  deleteLabel (labelId, callback) {
    try {
      labelModel.deleteLabel(labelId, (error, data) => {
        if (!labelId) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  }
}

module.exports = new LabelService();
