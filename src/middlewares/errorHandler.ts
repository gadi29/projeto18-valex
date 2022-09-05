import { Request, Response, NextFunction } from 'express';

export default async function errorHandler(error, req: Request, res: Response, next: NextFunction) {
  if (error.code === 'BadRequest') return res.status(400).send(error.message);
  else if (error.code === 'Unauthorized') return res.status(401).send(error.message);
  else if (error.code === 'Forbidden') return res.status(403).send(error.message);
  else if(error.code === 'NotFound') return res.status(404).send(error.message);
  else if (error.code === 'NotAcceptable') return res.status(406).send(error.message);
  else if (error.code === 'Conflict') return res.status(409).send(error.message);
  
  else res.sendStatus(500);
}