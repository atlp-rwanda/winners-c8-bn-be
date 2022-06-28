// this folder will contain validation middlewares' definitions.
import Joi from "joi";

const schema = {
  accommodationCreation: Joi.object({
    name: Joi.string().required().min(2).max(150),
    description: Joi.string(),
    location_id: Joi.string().required(),
    latitude: Joi.string().required().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    longitude: Joi.string().required().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    accommodation_image_link: Joi.string(),
  }),
  accommodationEdition: Joi.object({
    name: Joi.string().min(2).max(150),
    description: Joi.string(),
    location_id: Joi.string(),
    latitude: Joi.string().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    longitude: Joi.string().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    accommodation_image_link: Joi.string(),
  }),
};

const verifyAccommodation = {};

verifyAccommodation.onCreate = (req, res, next) => {
  const { error } = schema.accommodationCreation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  if(!req.inputFiles.accommodation_image){
    return res.status(400).json({
      error: "the 'image' form field should not be empty.",
    });
  }
  return next();
}

verifyAccommodation.onEdit = (req, res, next) => {
  const { error } = schema.accommodationEdition.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  return next();
}
export default verifyAccommodation;
