import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

const PORT: number = Number(process.env.PORT) || 5005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));