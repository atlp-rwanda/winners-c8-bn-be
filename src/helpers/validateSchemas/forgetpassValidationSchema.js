/* eslint-disable */
import Joi from 'joi';

const forgetpassValidationSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2

        })
});
export default forgetpassValidationSchema;