/* eslint-disable prefer-regex-literals */

const Joi = require('joi');
/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
const authRegister = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')),

  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')),

  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))
    .required()
});

const authLogin = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
    .required(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))

});
const forgotPasswordValidation = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
    .required()
});
const resetPasswordValidation = Joi.object({
  token: Joi.string().required(),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'))

});
const notesValidation = Joi.object({
  title: Joi.string()
    .required(),

  description: Joi.string()
    .required()
});

module.exports = { authRegister, authLogin, forgotPasswordValidation, resetPasswordValidation, notesValidation };
