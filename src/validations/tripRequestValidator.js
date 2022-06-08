import Joi from "joi";

const tripRequestValidation = async (req, res, next) => {
  console.log("Executing Validation........");
  next();
};

export default tripRequestValidation;
