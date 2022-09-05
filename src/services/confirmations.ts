import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

import * as cardRepository from '../repositories/cardRepository.js';

export async function existCard(id: number) {
  const card: any = await cardRepository.findById(id);
  if(!card) throw { code: 'NotFound', message: 'Este cartão não existe.' }

  return card;
}

export async function cardActivated(card) {
  if(!card.password) throw { code: 'BadRequest', message: 'Este cartão ainda não foi ativado.' }

  return;
}

export async function cardBlocked(card) {
  if(card.isBlocked) throw { code: 'BadRequest', message: 'Este cartão está bloqueado.' }

  return;
}

export async function expiredCard(card) {
  const todayDate: any = (dayjs().format('MM/YY').toString()).split('/');
  const expirationDate: any = (card.expirationDate).split('/');

  if ((Number(todayDate[1]) > Number(expirationDate[1])) ||
      (Number(todayDate[1]) === Number(expirationDate[1]) && Number(todayDate[0]) > Number(expirationDate[0]))) {
    throw { code: 'Forbidden', message: 'A data do cartão expirou.' }
  }

  return;
}

export async function passwordConfirmation(card, password: string) {
  if (!(bcrypt.compareSync(password, card.password))) throw { code: 'Unauthorized', message: 'Senha incorreta.' }

  return;
}