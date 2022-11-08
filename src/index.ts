import 'reflect-metadata';
import  express from 'express';
import dotenv from 'dotenv';
import PostgresDataSource  from './database';
import authRouter from './routers';
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

dotenv.config();

const app = express();


app.use(express.json());

PostgresDataSource


app.use("/api/v1", authRouter);

const port  = process.env.PORT || process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`)
})
