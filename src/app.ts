require('dotenv').config();
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import config from 'config';
import { PrismaClient } from '@prisma/client';
import validateEnv from './utils/validateEnv';
import authRouter from './routes/auth.routes';
import landlordRouter from './routes/landlord.routes';
import AppError from './utils/appError';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
    //TEMPLATE ENGINE
    app.set('view engine', 'pug');
    app.set('views', `${__dirname}/views`);

    //MIDDLEWARE
    app.use(express.json({limit: '10kb'}));

    //Cookie Parser
    app.use(cookieParser());

    //Cors
    app.use(
        cors({
            origin: [config.get<string>('origin')],
            credentials: true,
        })
    );

    //Logger
    if(process.env.NODE_ENV === 'production') app.use(morgan('dev'));

    //Routes
  app.use('/api/auth', authRouter);
  app.use('/api/landlord', landlordRouter);

      // Testing
  app.get('/api/healthchecker', (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to NodeJs with Prisma and PostgreSQL',
    });
  });

  const port = config.get<number>('port');

app.listen(port || 8081, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
