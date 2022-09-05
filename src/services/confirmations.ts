import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

import * as cardsService from './cardsServices.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as businessRepository from '../repositories/businessRepository.js';

export async function existCard(id: number) {
  const card: any = await cardRepository.findById(id);
  if(!card) throw { code: 'NotFound', message: 'This card does not exist.' }

  return card;
}

export async function cardActivated(card) {
  if(!card.password) throw { code: 'BadRequest', message: 'This card has not yet been activated.' }

  return;
}

export async function cardBlocked(card) {
  if(card.isBlocked) throw { code: 'BadRequest', message: 'This card is blocked.' }

  return;
}

export async function expiredCard(card) {
  const todayDate: any = (dayjs().format('MM/YY').toString()).split('/');
  const expirationDate: any = (card.expirationDate).split('/');

  if ((Number(todayDate[1]) > Number(expirationDate[1])) ||
      (Number(todayDate[1]) === Number(expirationDate[1]) && Number(todayDate[0]) > Number(expirationDate[0]))) {
    throw { code: 'Forbidden', message: 'Card date has expired.' }
  }

  return;
}

export async function passwordConfirmation(card, password: string) {
  if (!(bcrypt.compareSync(password, card.password))) throw { code: 'Unauthorized', message: 'Incorrect password.' }

  return;
}

export async function existBusiness(businessId: number) {
  const business: any = await businessRepository.findById(businessId);
  if(!business) throw { code: 'NotFound', message: 'This company is not registered.' }

  return business;
}

export async function cardType(business: any, card: any) {
  if(business.type !== card.type) throw { code: 'BadRequest', message: 'This card is not enabled for this type of transaction.' }
  
  return;
}

export async function balancePurchase(cardId: number, amount: number) {
  const balance: any = await cardsService.balanceCard(cardId);
  if(balance.balance < amount) throw { code: 'NotAcceptable', message: 'No balance for this purchase.' }
  
  return;
}