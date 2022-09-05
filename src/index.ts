import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';


dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 5005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));