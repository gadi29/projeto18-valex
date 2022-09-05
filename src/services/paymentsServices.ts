import { cryptr } from '../cryptrKey.js';

import * as cardsService from './cardsServices.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as businessRepository from '../repositories/businessRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as confirm from './confirmations.js';

export async function finishPurchase (businessId: number, { cardId, password, amount }) {
  const card: any = await confirm.existCard(cardId);
  await confirm.expiredCard(card);
  await confirm.cardActivated(card);
  await confirm.cardBlocked(card);
  await confirm.passwordConfirmation(card, password);

  const business: any = await businessRepository.findById(businessId);
  
  if(!business) throw { code: 'NotFound', message: 'Esta empresa não está cadastrada.' }

  if(business.type !== card.type) throw { code: 'BadRequest', message: 'Este cartão não é habilitado para este tipo de transação.' }

  const balance: any = await cardsService.balanceCard(cardId);
  if(balance.balance < amount) throw { code: 'NotAcceptable', message: 'Cartão sem saldo para esta compra.' }

  await paymentRepository.insert({ cardId, businessId, amount });

  return;
}

export async function finishOnlinePurchase (businessId: number, requestedInformations) {
  const card: any = await cardRepository.findByCardDetails(requestedInformations.number, requestedInformations.cardholderName, requestedInformations.expirationDate);
  if (!card) throw { code: 'NotFound', message: 'Este cartão não existe, ou os dados estão incorretos.' }
  
  if(requestedInformations.securityCode !== cryptr.decrypt(card.securityCode)) throw { code: 'Unauthorized', message: 'Código de segurança incorreto.' }

  await confirm.expiredCard(card);
  await confirm.cardActivated(card);
  await confirm.cardBlocked(card);

  const business: any = await businessRepository.findById(businessId);
  
  if(!business) throw { code: 'NotFound', message: 'Esta empresa não está cadastrada.' }

  if(business.type !== card.type) throw { code: 'BadRequest', message: 'Este cartão não é habilitado para este tipo de transação.' }

  const balance: any = await cardsService.balanceCard(card.id);
  if(balance.balance < requestedInformations.amount) throw { code: 'NotAcceptable', message: 'Cartão sem saldo para esta compra.' }

  await paymentRepository.insert({ cardId: card.id, businessId, amount: requestedInformations.amount });

  return;
}