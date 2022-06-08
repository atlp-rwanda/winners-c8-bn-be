import Joi from "joi";

const schema = Joi.object({
  departure: Joi.string().required().min(3).max(150),
  destination: Joi.string().required().min(3).max(150),
  travelReason: Joi.string().required().min(3).max(255).label("Travel Reason"),
  accommodationId: Joi.alternatives()
    .try(Joi.string(), Joi.number())
    .required()
    .label("Accommodation"),
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
});

const tripRequestValidation = async (req, res, next) => {
  const {
    departure,
    destination,
    dateOfDeparture,
    travelReason,
    accommodationId,
  } = { ...req.body };

  const tripRequest = {
    departure,
    destination,
    dateOfDeparture,
    travelReason,
    accommodationId,
  };

  if (req.body.dateOfReturn) {
    tripRequest.dateOfReturn = req.body.dateOfReturn;
  } else {
    tripRequest.dateOfReturn = null;
  }

  try {
    const result = await schema.validateAsync(tripRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  return next();
};

export default tripRequestValidation;
