import { DataSource } from "typeorm";
import { User } from "../entities/User";

const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'waridi',
    password: 'waridi',
    database: 'waridi123.',
    entities: [User],
    synchronize: true
})

export  {PostgresDataSource};
