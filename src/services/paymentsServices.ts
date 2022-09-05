import { cryptr } from '../cryptrKey.js';

import * as cardRepository from '../repositories/cardRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as confirm from './confirmations.js';

export async function finishPurchase (businessId: number, { cardId, password, amount }) {
  const card: any = await confirm.existCard(cardId);
  await confirm.expiredCard(card);
  await confirm.cardActivated(card);
  await confirm.cardBlocked(card);
  await confirm.passwordConfirmation(card, password);

  const business: any = await confirm.existBusiness(businessId);
  await confirm.cardType(business, card);

  await confirm.balancePurchase(card.id, amount);

  await paymentRepository.insert({ cardId, businessId, amount });

  return;
}

export async function finishOnlinePurchase (businessId: number, requestedInformations) {
  const card: any = await cardRepository.findByCardDetails(requestedInformations.number, requestedInformations.cardholderName, requestedInformations.expirationDate);
  if (!card) throw { code: 'NotFound', message: 'This card does not exist, or the data is incorrect.' }
  
  if(requestedInformations.securityCode !== cryptr.decrypt(card.securityCode)) throw { code: 'Unauthorized', message: 'Incorrect security code.' }

  await confirm.expiredCard(card);
  await confirm.cardActivated(card);
  await confirm.cardBlocked(card);

  const business: any = await confirm.existBusiness(businessId);
  await confirm.cardType(business, card);

  await confirm.balancePurchase(card.id, requestedInformations.amount);

  await paymentRepository.insert({ cardId: card.id, businessId, amount: requestedInformations.amount });

  return;
}