/*eslint-disable*/
import Joi from 'joi';

const SignUpValidationSchema = Joi.object({
    firstName: Joi.string()
                .required(),
    lastName: Joi.string().required(),
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2

        }),
    password: Joi.string()
        .required()
});
export default SignUpValidationSchema;