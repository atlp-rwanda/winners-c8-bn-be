// this folder will contain validation middlewares' definitions.
import Joi from "joi";

const schema = {
  accommodationCreation: Joi.object({
    name: Joi.string().required().min(2).max(150),
    description: Joi.string(),
    location_id: Joi.string().required(),
    latitude: Joi.string().required().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    longitude: Joi.string().required().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    images_links: Joi.array().items(Joi.string()),
    add_on_services: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      details: Joi.string()
     })),
    amenities: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      details: Joi.string()
    })),
  }),
  accommodationEdition: Joi.object({
    name: Joi.string().min(2).max(150),
    description: Joi.string(),
    location_id: Joi.string(),
    latitude: Joi.string().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    longitude: Joi.string().pattern(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
    image_link: Joi.string(),
    add_on_service: Joi.object().keys({
      name: Joi.string().required(),
      details: Joi.string()
     }),
    amenity: Joi.object().keys({
      name: Joi.string().required(),
      details: Joi.string()
    }),
  }),
  roomCreation: Joi.object({
    accommodation_id: Joi.string().required(),
    bed_type: Joi.string().required(),
    cost: Joi.string().required(),
    images_links: Joi.array().items(Joi.string()),
  }),
  roomEdition: Joi.object({
    accommodation_id: Joi.string(),
    bed_type: Joi.string(),
    cost: Joi.string(),
    image_link: Joi.string(),
  }),
};

const validateAccommodation = {};

validateAccommodation.onCreate = (req, res, next) => {
  const { error } = schema.accommodationCreation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  if(!(req.inputFiles.accommodation_image)){
    return res.status(400).json({
      error: "the 'accommodation image' file is not provided.",
    });
  }
  return next();
}

validateAccommodation.onEdit = (req, res, next) => {
  const { error } = schema.accommodationEdition.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  return next();
}

validateAccommodation.onCreateRoom = (req, res, next) => {
  const { error } = schema.roomCreation.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  return next();
}
validateAccommodation.onEditRoom = (req, res, next) => {
  const { error } = schema.roomEdition.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  return next();
}

export default validateAccommodation;
