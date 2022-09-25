require('dotenv').config();
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import config from 'config';
import bodyParser from 'body-parser';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import validateEnv from './utils/validateEnv';
import authRouter from './routes/auth.routes';
import landlordRouter from './routes/landlord.routes';
import AppError from './utils/appError';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import imageRouter from '../src/routes/image.routes';
import marketRouter from '../src/routes/market.routes';
require('../config/connectMongo');


validateEnv();

const prisma = new PrismaClient();
const app = express();



async function bootstrap() {
    //TEMPLATE ENGINE
    app.set('view engine', 'pug');
    app.set('views', `${__dirname}/views`);

    //MIDDLEWARE
    // app.use(express.json({limit: '10kb'}));

   app.use(bodyParser.json())

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

// app.use(express.json())
app.use('/assets', express.static('assets'));  
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

    //Routes
  app.use('/api/auth', authRouter);
  app.use('/api/landlord', landlordRouter);
  app.use('/api/image', imageRouter);
  app.use('/api/market', marketRouter);

      // Testing
  app.get('/api/healthchecker', (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to NodeJs with Prisma and PostgreSQL',
    });
  });

  const port = config.get<number>('port');

app.listen(port || 8082, '192.168.0.37', () => {
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
