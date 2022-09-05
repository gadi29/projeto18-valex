import { Request, Response } from 'express';
import * as cardsService from '../services/cardsServices.js';

export async function createCard (req: Request, res: Response) {
  const newCard: object = req.body;
  const { apikey } = req.headers;

  const card: any = await cardsService.createCard(apikey, newCard);
  res.send(card);
}

export async function activateCard (req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const cardData: object = req.body;

  await cardsService.activateCard(id, cardData);
  res.send("Card activated successfully!");
}

export async function visualizeCard (req: Request, res: Response) {
  const cardId: number = Number(req.params.id);
  const password: string = req.body.password;

  const card: any = await cardsService.visualizeCard(cardId, password);
  res.send(card);
}

export async function balanceCard (req: Request, res: Response) {
  const id: number = Number(req.params.id);

  const balance: object = await cardsService.balanceCard(id);
  res.send(balance);
}

export async function blockCard (req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const password: string = req.body.password;

  await cardsService.blockCard(id, password);
  res.send("Card blocked successfully!");
}

export async function unblockCard (req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const password: string = req.body.password;

  await cardsService.unblockCard(id, password);
  res.send("Card successfully unlocked!");
}