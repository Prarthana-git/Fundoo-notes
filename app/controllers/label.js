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

  getAllLabels (req, res) {
    try {
      labelService.getAllLabels((error, labelData) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Some error occured'
          });
        }
        res.status(200).send({
          success: true,
          message: 'Retrieved Notes',
          data: labelData
        });
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error'
      });
    }
  }

  getOne (req, res) {
    const labelId = req.params.labelId;
    labelService.labelById(labelId, (error, Data) => {
      if (error) {
        return res.status(400).send({
          success: false,
          message: 'Note not found'
        });
      } else {
        return res.status(200).send({
          success: true,
          message: 'Retrieved Note details',
          data: Data
        });
      }
    });
  }

  updateLabel (req, res) {
    try {
      const infoValidation = labelValidation.validate(req.body);
      if (infoValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Enter Valid Details',
          data: infoValidation
        });
      }
      const labelId = req.params.labelId;
      const labelData = {
        labelName: req.body.labelName
      };
      const updateLabel = labelService.updateLabel(labelId, labelData);
      return res.status(200).send({
        success: true,
        message: 'label updated successfully.!!',
        data: updateLabel
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  deleteLabel (req, res) {
    try {
      const labelId = req.params.labelId;
      labelService.deleteLabel(labelId, (error, labelData) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Some error occure while Deleting the data'
          });
        } else {
          return res.status(200).send({
            success: true,
            message: 'Deleted Label successfully',
            data: labelData
          });
        }
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error'
      });
    }
  }
}

module.exports = new LabelController();
