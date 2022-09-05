import { Request, Response, NextFunction } from 'express';
import { validateSchema } from './validateSchemaMiddleware.js';
import cardsSchema from '../schemas/cardsSchema.js';

export async function APIKeyValidation (req: Request, res: Response, next: NextFunction) {
  const { apikey } = req.headers;
  if (!apikey) throw { code: 'Unauthorized', message: 'A chave de API não foi recebida, ou foi recebida incorretamente.' }

  next();
}