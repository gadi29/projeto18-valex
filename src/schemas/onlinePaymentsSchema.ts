import joi from 'joi';

const onlinePaymentsSchema = joi.object({
  number: joi.string().required(),
  cardholderName: joi.string().required(),
  expirationDate: joi.string().required(),
  securityCode: joi.string().required(),
  amount: joi.number().integer().min(1).required()
})

export default onlinePaymentsSchema;