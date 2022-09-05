import { Router } from 'express';
import { createCard, activateCard } from '../controllers/cardsControllers.js';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { APIKeyValidation } from '../middlewares/cardsMiddlewares.js';

import cardsSchema from '../schemas/cardsSchema.js';
import activateCardSchema from '../schemas/activateCardSchema.js';

const cardsRouter = Router();

cardsRouter.post('/cards', validateSchema(cardsSchema), APIKeyValidation, createCard);
cardsRouter.post('/cards/activate/:id', validateSchema(activateCardSchema), activateCard);

export default cardsRouter;