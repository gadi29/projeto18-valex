import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { APIKeyValidation } from '../middlewares/APIValidation.js';
import { 
  createCard, 
  activateCard, 
  visualizeCard, 
  balanceCard, 
  blockCard, 
  unblockCard } from '../controllers/cardsControllers.js';

import cardsSchema from '../schemas/cardsSchema.js';
import activateCardSchema from '../schemas/activateCardSchema.js';

const cardsRouter = Router();

cardsRouter.post('/card', validateSchema(cardsSchema), APIKeyValidation, createCard);
cardsRouter.put('/card/activate/:id', validateSchema(activateCardSchema), activateCard);
cardsRouter.get('/card/:id', visualizeCard)
cardsRouter.get('/card/balance/:id', balanceCard);
cardsRouter.put('/card/block/:id', blockCard);
cardsRouter.put('/card/unblock/:id', unblockCard);

export default cardsRouter;