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
  }),

  signin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  updateprofile: Joi.object().keys({
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
    phoneNumber: Joi.string().required().empty().min(10).max(10).messages({
      "any.required": "{{#label}} field is required",
      "string.base": "{{#label}} must be of type string",
      "string.empty": "{{#label}} can not be empty",
      "string.pattern.base": "{{#label}} must contain 10 numbers",
    }),
    username: Joi.string()
      .empty()
      .min(6)
      .max(20)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    gender: Joi.string()
      .empty()
      .min(1)
      .max(10)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    image: Joi.string().empty().messages({
      "any.required": "{{#label}} field is required",
      "string.base": "{{#label}} must be of type string",
      "string.empty": "{{#label}} can not be empty",
      "string.pattern.base": "{{#label}} must contain only image format.",
    }),
    preferredLanguage: Joi.string()
      .empty()
      .min(6)
      .max(20)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    preferredCurrency: Joi.string()
      .empty()
      .min(3)
      .max(10)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    department: Joi.string()
      .empty()
      .min(3)
      .max(20)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    user_role: Joi.string(),
    managerId: Joi.string(),
  }),

  addManager: Joi.object({
    email: Joi.string().required(),
    managerId: Joi.string().required(),
  }),

  tripRequest: Joi.object({
    departureId: Joi.number().required(),
    destinationsId: Joi.alternatives()
      .try(
        Joi.number(),
        Joi.string(),
        Joi.array().items(Joi.alternatives(Joi.number(), Joi.string()))
      )
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

  static async verifyUpdateUserProfile(req, res, next) {
    const { error } = schema.updateprofile.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
    }
    return next();
  }
  static async verifyManager(req, res, next) {
    const { error } = schema.addManager.validate(req.body);
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
      destinationsId,
      dateOfDeparture,
      travelReason,
      accommodationId,
    } = { ...req.body };

    const tripRequest = {
      departureId,
      destinationsId,
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
  static async verifyTripRequestStatusUpdate(req, res, next) {
    try {
      const result = await Joi.object({
        status: Joi.valid("Approved", "Rejected").required(),
      }).validateAsync(req.body);
      req.body = result;
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
    return next();
  }
  static async verifyNotificationMethod(req, res, next) {
    try {
      const result = await Joi.object({
        method: Joi.valid("email", "inapp", "both", "none").required(),
      }).validateAsync(req.body);
      req.body = result;
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
    return next();
  }
}
export default AuthValidation;
