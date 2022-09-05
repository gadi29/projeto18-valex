import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { APIKeyValidation } from '../middlewares/cardsMiddlewares.js';
import { createCard, activateCard, blockCard, unlockCard } from '../controllers/cardsControllers.js';

import cardsSchema from '../schemas/cardsSchema.js';
import activateCardSchema from '../schemas/activateCardSchema.js';

const cardsRouter = Router();

cardsRouter.post('/card', validateSchema(cardsSchema), APIKeyValidation, createCard);
cardsRouter.put('/card/activate/:id', validateSchema(activateCardSchema), activateCard);
cardsRouter.put('/card/block/:id', blockCard);
cardsRouter.put('/card/unlock/:id', unlockCard);

export default cardsRouter;