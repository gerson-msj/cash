import { DataSource, DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [],
    subscribers: [],
    migrations: []
}

export const AppDataSource = new DataSource(options)