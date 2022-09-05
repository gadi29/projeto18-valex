import { Request, Response, NextFunction } from 'express';

import * as companyRepository from '../repositories/companyRepository.js';

export async function APIKeyValidation (req: Request, res: Response, next: NextFunction) {
  const { apikey }: any = req.headers;
  if (!apikey) throw { code: 'BadRequest', message: 'API key not received.' }

  const company: object = await companyRepository.findByApiKey(apikey);
  if(!company) throw { code: 'BadRequest', message: 'There is no company registered with this API key.' }

  next();
}