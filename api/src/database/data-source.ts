import { DataSource, DataSourceOptions } from "typeorm";
import Categoria from "../domain/entities/Categoria";
import Conta from "../domain/entities/Conta";
import FamiliaEntity from "../domain/entities/FamiliaEntity";
import Integrante from "../domain/entities/Integrante";
import Movimento from "../domain/entities/Movimento";

const options: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [
        FamiliaEntity,
        Integrante,
        Conta,
        Categoria,
        Movimento,
    ],
    subscribers: [],
    migrations: []
}

export const AppDataSource = new DataSource(options)