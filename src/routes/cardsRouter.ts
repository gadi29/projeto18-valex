import { Router } from 'express';
import { APIKeyValidation, cardTypeValidation } from '../middlewares/cardsMiddlewares';

const cardsRouter = Router();

cardsRouter.post('/cards', APIKeyValidation, cardTypeValidation, createCard);

export default cardsRouter;