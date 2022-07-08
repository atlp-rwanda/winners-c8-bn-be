import Joi from 'joi';

const userValidationSchema = Joi.object({
    lineManagerId: Joi.string()
                .required(),
    id: Joi.string().required(),
});
export default userValidationSchema;