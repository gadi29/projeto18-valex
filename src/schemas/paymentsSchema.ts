import joi from 'joi';

const paymentsSchema = joi.object({
  cardId: joi.number().required(),
  password: joi.string().required(),
  amount: joi.number().integer().min(1).required()
})

export default paymentsSchema;