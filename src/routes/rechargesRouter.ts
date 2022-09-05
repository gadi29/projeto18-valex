import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { rechargeCard } from '../controllers/rechargesControllers.js';

import rechargesSchema from '../schemas/rechargesSchema.js';

const rechargesRouter = Router();

rechargesRouter.post('/recharge/:id', validateSchema(rechargesSchema), rechargeCard);

export default rechargesRouter;