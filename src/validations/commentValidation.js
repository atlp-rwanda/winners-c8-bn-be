import Joi from 'joi'

function commentValidation(req, res, next) {
	const commentValiationSchema = Joi.object({
		comment: Joi.string().required().messages({
			'string.base':
				'Sorry! It looks like something went wrong. Please try later',
			'string.empty': 'comment is not allowed to be empty',
			'any.required': 'comment is required',
		}),
	});
	const { userId, tripId } = req.params;
	const result = commentValiationSchema.validate(req.body , userId ,tripId);
	
	if (result.error)
		return res
			.status(400)
			.json({ Message: result.error.details[0].message });
	next();
}
export default commentValidation;
