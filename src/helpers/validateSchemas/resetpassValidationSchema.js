/* eslint-disable */
import Joi from 'joi';

const resetpassValidationSchema = Joi.object({
    password: Joi.string()
        .required()
});
export default resetpassValidationSchema;