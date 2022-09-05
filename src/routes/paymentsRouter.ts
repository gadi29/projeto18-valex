import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { finishPurchase, finishOnlinePurchase } from '../controllers/paymentsControllers.js';

import paymentsSchema from '../schemas/paymentsSchema.js';
import onlinePaymentsSchema from '../schemas/onlinePaymentsSchema.js';

const paymentsRouter = Router();

paymentsRouter.post('/payment/:businessId', validateSchema(paymentsSchema), finishPurchase);
paymentsRouter.post('/payment/online/:businessId', validateSchema(onlinePaymentsSchema), finishOnlinePurchase);

export default paymentsRouter;