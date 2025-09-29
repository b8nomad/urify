import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

import slugRouter from './routes/slug.route.js';

app.use('/api/urify', slugRouter);
app.get('/health', (_, res) => res.status(200).send('OK'));

export default app;