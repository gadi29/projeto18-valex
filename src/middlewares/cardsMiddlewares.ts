import { Request, Response, NextFunction } from 'express';
import { validateSchema } from './validateSchemaMiddleware';
import cardsSchema from '../schemas/cardsSchema';

export async function APIKeyValidation (req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers;
  if (!apiKey) throw { code: 'NoContent', message: 'A chave de API não foi recebida, ou foi recebida incorretamente.' }

  next();
}

export async function cardTypeValidation (req: Request, res: Response, next: NextFunction) {
  validateSchema(cardsSchema);

  next();
}