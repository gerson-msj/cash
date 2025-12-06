import { DataSource, DataSourceOptions } from "typeorm";
import CategoriaEntity from "../domain/entities/categoria";
import ContaEntity from "../domain/entities/conta";
import FamiliaEntity from "../domain/entities/familia";
import IntegranteEntity from "../domain/entities/integrante";
import Movimento from "../domain/entities/movimento";

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