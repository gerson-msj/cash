import { DataSource, DataSourceOptions } from "typeorm";
import CategoriaEntity from "../domain/entities/CategoriaEntity";
import ContaEntity from "../domain/entities/ContaEntity";
import FamiliaEntity from "../domain/entities/FamiliaEntity";
import IntegranteEntity from "../domain/entities/IntegranteEntity";
import Movimento from "../domain/entities/MovimentoEntity";

const options: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [
        FamiliaEntity,
        IntegranteEntity,
        ContaEntity,
        CategoriaEntity,
        Movimento,
    ],
    subscribers: [],
    migrations: []
}

export const AppDataSource = new DataSource(options)