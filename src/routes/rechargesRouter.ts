import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { APIKeyValidation } from '../middlewares/APIValidation.js';
import { rechargeCard } from '../controllers/rechargesControllers.js';

import rechargesSchema from '../schemas/rechargesSchema.js';

const rechargesRouter = Router();

rechargesRouter.post('/recharge/:id', validateSchema(rechargesSchema), APIKeyValidation, rechargeCard);

export default rechargesRouter;