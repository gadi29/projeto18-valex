import { Request, Response } from 'express';
import * as paymentsServices from '../services/paymentsServices.js';

export async function finishPurchase (req: Request, res: Response) {
  const businessId: number = Number(req.params.businessId);
  const { cardId, password, amount } = req.body;

  await paymentsServices.finishPurchase(businessId, { cardId, password, amount });
  res.send('Purchase made successfully!');
}

export async function finishOnlinePurchase (req: Request, res: Response) {
  const businessId: number = Number(req.params.businessId);
  const requestedInformations = req.body;

  await paymentsServices.finishOnlinePurchase(businessId, requestedInformations);
  res.send('Purchase made successfully!');
}