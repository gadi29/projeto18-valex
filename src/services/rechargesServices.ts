import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as confirm from './confirmations.js';

export async function rechargeCard (id: number, amount: number) {
  const card: any = await confirm.existCard(id);
  await confirm.expiredCard(card);
  await confirm.cardActivated(card);
  await confirm.cardBlocked(card);

  await rechargeRepository.insert({ cardId: id, amount });

  return;
}