import joi from 'joi';

const rechargesSchema = joi.object({
amount: joi.number().min(1).required()
})

export default rechargesSchema;