const logger = require('../../config/loggers');
const labelService = require('../service/label');
const { labelValidation } = require('../middleware/validation');
class LabelController {
  createLabel (req, res) {
    try {
      const infoValidation = labelValidation.validate(req.body);
      if (infoValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Enter Valid Details',
          data: infoValidation
        });
      }
      const labelData = {
        labelName: req.body.labelName,
        notesId: req.params.notesId
      };
      const labelCreate = labelService.createLabel(labelData);
      logger.info('Label Created');
      res.status(201).send({
        success: true,
        message: 'Label Created!',
        data: labelCreate
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Error while creating label'
      });
    }
  }
}

module.exports = new LabelController();
