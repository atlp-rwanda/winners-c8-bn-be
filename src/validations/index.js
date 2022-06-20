// this folder will contain validation middlewares' definitions.
import Joi from "joi";

const schema = {
  signupvalidate: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string()
      .empty()
      .min(2)
      .max(20)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    lastName: Joi.string()
      .empty()
      .min(2)
      .max(20)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters",
      }),
    user_role: Joi.string(),
  }),
  signin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const { signupvalidate } = schema;

class AuthValidation {
  static async verifySignup(req, res, next) {
    const { error } = signupvalidate.validate(req.body);
    if (error) {
      return(
        res.status(400).json({
          error: error.details[0].message.replace(/["'`]+/g, ""),
        })
      );
    }
    return next();
  }
  static async verifySignin(req, res, next) {
    const { error } = schema.signin.validate(req.body);
    if (error) {
      throw new Error(
        res.status(400).json({
          error: error.details[0].message.replace(/["'`]+/g, ""),
        })
      );
    }
    return next();
  }
}
export default AuthValidation;
