import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../entities/User";

const options: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [User],
    subscribers: [],
    migrations: []
}

export const AppDataSource = new DataSource(options)