import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

export async function rechargeCard (id: number, amount: number) {
  const card: any = await cardRepository.findById(id);
  if(!card) throw { code: 'NotFound', message: 'Este cartão não existe.' }

  if(!card.password) throw { code: 'BadRequest', message: 'Este cartão ainda não foi ativado.' }

  if(card.isBlocked) throw { code: 'BadRequest', message: 'Este cartão está bloqueado.' }

  await rechargeRepository.insert({ cardId: id, amount });

  return;
}