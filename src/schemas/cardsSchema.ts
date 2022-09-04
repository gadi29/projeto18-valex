import joi from 'joi';

const cardsSchema = joi.object({
employeeId: joi.number().required(),
isVirtual: joi.boolean().required(),
type: joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})

export default cardsSchema;