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
    managerId: Joi.string(),
  }),
  signin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),

  tripRequest: Joi.object({
    departureId: Joi.number().required(),
    destinationId: Joi.number()
      .required()
      .invalid(Joi.ref("departureId"))
      .messages({
        "any.invalid": `Destination location must not be same as Departure location`,
      }),
    travel_reason: Joi.string()
      .required()
      .min(3)
      .max(255)
      .label("Travel Reason"),
    accommodationId: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .required(),
    dateOfDeparture: Joi.date()
      .greater("now")
      .label("Date of Departure")
      .required()
      .messages({
        "date.greater": `Date of departure must be after to day`,
        "date.format": `Date format must be YYYY-MM-DD`,
        "date.base": `Date format must be YYYY-MM-DD`,
      }),
    dateOfReturn: Joi.date()
      .greater(Joi.ref("dateOfDeparture"))
      .label("Date of Return")
      .messages({
        "date.greater": `Date of return must be after date of departure`,
        "date.format": `Date format must be YYYY-MM-DD`,
        "date.base": `Date format must be YYYY-MM-DD`,
      }),
  }),

  location: Joi.object({
    country: Joi.string().required().min(3).max(150),
    state: Joi.string().min(3).max(150),
    province: Joi.string().min(3).max(150),
    city: Joi.string().required().min(3).max(150),
  }),
};

const { signupvalidate } = schema;

class AuthValidation {
  static async verifySignup(req, res, next) {
    const { error } = signupvalidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
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

  static async verifyLocation(req, res, next) {
    const { error } = schema.location.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
    }
    return next();
  }

  static async verifyTripRequest(req, res, next) {
    const {
      departureId,
      destinationId,
      dateOfDeparture,
      travelReason,
      accommodationId,
    } = { ...req.body };

    const tripRequest = {
      departureId,
      destinationId,
      dateOfDeparture,
      travel_reason: travelReason,
      accommodationId,
    };

    try {
      const result = await schema.tripRequest.validateAsync(tripRequest);
    } catch (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (req.body.dateOfReturn) {
      tripRequest.dateOfReturn = req.body.dateOfReturn;
    } else {
      tripRequest.dateOfReturn = null;
    }
    req.body = tripRequest;

    return next();
  }
}
export default AuthValidation;
