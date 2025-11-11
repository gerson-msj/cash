import { DataSource, DataSourceOptions } from "typeorm";
import Categoria from "../domain/entities/Categoria";
import Conta from "../domain/entities/Conta";
import Familia from "../domain/entities/Familia";
import Integrante from "../domain/entities/Integrante";
import Movimento from "../domain/entities/Movimento";

const options: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [
        Familia,
        Integrante,
        Conta,
        Categoria,
        Movimento,
    ],
    subscribers: [],
    migrations: []
}

export const AppDataSource = new DataSource(options)