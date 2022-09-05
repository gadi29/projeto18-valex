import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { cryptr } from '../cryptrKey.js';
import bcrypt from 'bcrypt';

import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as confirm from './confirmations.js';


export async function createCard (APIKey: any, cardDetails: any) {
  const company:object = await companyRepository.findByApiKey(APIKey);
  if(!company) throw { code: 'NotFound', message: 'Empresa não encontrada.' }
  
  const employee: any = await employeeRepository.findById(cardDetails.employeeId);
  if (!employee) throw { code: 'NotFound', message: 'Funcionário não encontrado.' }

  const existTypeCard: object = await cardRepository.findByTypeAndEmployeeId(cardDetails.type, cardDetails.employeeId);
  if (existTypeCard) throw { code: 'Conflict', message: 'Este funcionário já possui um cartão deste tipo.' }

  const number: string = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');

  const employeeNameArr: string[] = employee.fullName.split(' ');
  const cardholderNameArr: string[] = [employeeNameArr[0]];

  for (let i = 1; i < (employeeNameArr.length) - 1; i++) {
    if (employeeNameArr[i].length > 3) cardholderNameArr.push(employeeNameArr [i][0]);
  }
  
  cardholderNameArr.push(employeeNameArr[employeeNameArr.length - 1]);
  const cardholderName: string = cardholderNameArr.join(' ').toUpperCase();

  const expirationDate: string = dayjs().add(5, 'years').format('MM/YY').toString();

  const securityCode: string = cryptr.encrypt(faker.finance.creditCardCVV());

  await cardRepository.insert({ ...cardDetails, number, cardholderName, expirationDate, securityCode, isBlocked: true });

  return;
}

export async function activateCard (id: number, cardData: any) {
  const card: any = await confirm.existCard(id);
  await confirm.expiredCard(card);

  if(card.password) throw { code: 'BadRequest', message: 'Este cartão já foi ativado.' }
  
  if(cardData.securityCode !== cryptr.decrypt(card.securityCode)) throw { code: 'Unauthorized', message: 'Código de segurança incorreto.' }

  const passwordHash: string = bcrypt.hashSync(cardData.password, 10);

  await cardRepository.update(id, { password: passwordHash, isBlocked: false });

  return;
}

export async function visualizeCard (cardId: number, password: string) {
  const card: any = await confirm.existCard(cardId);
  await confirm.cardActivated(card);
  await confirm.passwordConfirmation(card, password);

  const securityCode: string = cryptr.decrypt(card.securityCode);
  let cardSituation: string;
  if (card.isBlocked) cardSituation = 'Cartão bloqueado';
  else cardSituation = 'Cartão desbloqueado';

  return { 
    number: card.number, 
    cardholderName: card.cardholderName, 
    expirationDate: card.expirationDate, 
    securityCode,
    cardSituation };
}

export async function balanceCard (id: number) {
  await confirm.existCard(id);

  const transactions: any = await paymentRepository.findByCardId(id);
  const recharges: any = await rechargeRepository.findByCardId(id);

  let totalTransactionsAmount: number = 0;
  let totalRechargesAmount: number = 0;

  if(transactions.length > 0) transactions.map((transaction: any) => totalTransactionsAmount += transaction.amount);
  if(recharges.length > 0) recharges.map((recharge: any) => totalRechargesAmount += recharge.amount);

  const balance: number = (totalRechargesAmount - totalTransactionsAmount);

  return ({ balance, transactions, recharges });
}

export async function blockCard (id: number, password: string) {
  const card: any = await confirm.existCard(id);
  await confirm.expiredCard(card);
  await confirm.cardActivated(card);
  await confirm.passwordConfirmation(card, password);

  if(card.isBlocked) throw { code: 'BadRequest', message: 'Este cartão já está bloqueado.' }

  await cardRepository.update(id, { isBlocked: true });

  return;
}

export async function unblockCard (id: number, password: string) {
  const card: any = await confirm.existCard(id);
  await confirm.expiredCard(card);
  await confirm.cardActivated(card);
  await confirm.passwordConfirmation(card, password);

  if(!card.isBlocked) throw { code: 'BadRequest', message: 'Este cartão não está bloqueado.' }

  await cardRepository.update(id, { isBlocked: false });

  return;
}