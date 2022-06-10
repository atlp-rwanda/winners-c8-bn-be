/* eslint-disable */
import Joi from 'joi';

const SignInValidationSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2

        }),
    password: Joi.string()
        .required()
});
export default SignInValidationSchema;