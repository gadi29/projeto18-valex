import { Request, Response } from 'express';
import * as cardsService from '../services/cardsServices.js';

export async function createCard(req: Request, res: Response) {
  const newCard: object = req.body;
  const { apikey } = req.headers;

  await cardsService.createCard(apikey, newCard);
  res.send("Cartão cadastrado com sucesso!");
}

export async function activateCard(req: Request, res: Response) {
  const id = Number(req.params.id);
  const cardData: object = req.body;

  await cardsService.activateCard(id, cardData);
  res.send("Cartão ativado com sucesso!");
}