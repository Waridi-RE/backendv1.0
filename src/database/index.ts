import { DataSource } from "typeorm";
import { User } from "../entities/User";
// Using environment variables
import dotenv from "dotenv";
dotenv.config();

const PostgresDataSource =  new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URI,
    logging: false,
    synchronize: true,
    entities: [User],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

PostgresDataSource
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })


export default PostgresDataSource;
