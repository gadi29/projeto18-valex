import { Request, Response, NextFunction } from 'express';

import * as companyRepository from '../repositories/companyRepository.js';

export async function APIKeyValidation (req: Request, res: Response, next: NextFunction) {
  const { apikey }: any = req.headers;
  if (!apikey) throw { code: 'BadRequest', message: 'A chave de API não foi recebida.' }

  const company: object = await companyRepository.findByApiKey(apikey);
  if(!company) throw { code: 'BadRequest', message: 'Não existe uma empresa cadastrada com esta chave de API.' }

  next();
}