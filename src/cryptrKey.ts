import dotenv from 'dotenv';
import Cryptr from 'cryptr';

dotenv.config();

export const cryptr = new Cryptr(process.env.SECRET);