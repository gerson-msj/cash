import { DataSource, DataSourceOptions } from "typeorm";
import Conta from "../entities/Conta";
import Familia from "../entities/Familia";
import Integrante from "../entities/Integrante";

const options: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [
        Familia,
        Integrante,
        Conta
    ],
    subscribers: [],
    migrations: []
}

export const AppDataSource = new DataSource(options)