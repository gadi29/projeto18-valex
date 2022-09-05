import { Request, Response } from 'express';
import * as rechargesServices from '../services/rechargesServices.js';

export async function rechargeCard (req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const amount: number = Number(req.body.amount);

  await rechargesServices.rechargeCard(id, amount);
  res.send('Cartão recarregado com sucesso!');
}