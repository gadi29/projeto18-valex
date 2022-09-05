import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { cryptr } from '../cryptrKey.js';
import bcrypt from 'bcrypt';

import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';

export async function createCard(APIKey: any, cardDetails: any) {
  const company:object = await companyRepository.findByApiKey(APIKey);
  if(!company) throw { code: 'NotFound', message: 'Empresa não encontrada.' }
  
  const employee: any = await employeeRepository.findById(cardDetails.employeeId);
  if (!employee) throw { code: 'NotFound', message: 'Funcionário não encontrado.' }

  const existCard: object = await cardRepository.findByTypeAndEmployeeId(cardDetails.type, cardDetails.employeeId);
  if (existCard) throw { code: 'Conflict', message: 'Este funcionário já possui um cartão deste tipo.' }

  const number: string = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
  
  const employeeNameArr: string[] = employee.fullName.split(' ');
  employeeNameArr[1] = employeeNameArr [1][0]; //loop para vários nomes do meio
  const cardholderName: string = employeeNameArr.join(' ').toUpperCase();

  const expirationDate: string = dayjs().add(5, 'years').format('MM/YY').toString();

  const securityCodeTest = faker.finance.creditCardCVV();
  const securityCode: string = cryptr.encrypt(securityCodeTest);
  console.log(securityCodeTest)

  await cardRepository.insert({ ...cardDetails, number, cardholderName, expirationDate, securityCode, isBlocked: true });

  return;
}

export async function activateCard(id: number, cardData: any) {
  const card: any = await cardRepository.findById(id);
  if(!card) throw { code: 'NotFound', message: 'Este cartão não existe.' }
  
  if(card.password) throw { code: 'BadRequest', message: 'Este cartão já foi ativado.' }

  if (cardData.securityCode !== cryptr.decrypt(card.securityCode)) throw { code: 'Unauthorized', message: 'Código de segurança incorreto.' }

  const passwordHash: string = bcrypt.hashSync(cardData.password, 10);

  await cardRepository.update(id, { password: passwordHash, isBlocked: false });

  return;
}