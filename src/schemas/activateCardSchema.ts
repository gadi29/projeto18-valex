import joi from 'joi';

const activateCardSchema = joi.object({
securityCode: joi.string().required(),
password: joi.string().pattern(/\d{4}/).length(4).required()
})

export default activateCardSchema;