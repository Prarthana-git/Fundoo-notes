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
}

module.exports = new LabelService();
