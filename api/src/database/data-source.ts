import { DataSource, DataSourceOptions } from "typeorm";
import CategoriaEntity from "../domain/entities/categoria";
import ContaEntity from "../domain/entities/conta";
import DataRefEntity from "../domain/entities/dataRef";
import FamiliaEntity from "../domain/entities/familia";
import IntegranteEntity from "../domain/entities/integrante";
import MovimentoEntity from "../domain/entities/movimento";
import SaldoCategoriaEntity from "../domain/entities/saldoCategoria";
import SaldoContaEntity from "../domain/entities/saldoConta";

const options: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [
        FamiliaEntity,
        IntegranteEntity,
        ContaEntity,
        CategoriaEntity,
        DataRefEntity,
        MovimentoEntity,
        SaldoContaEntity,
        SaldoCategoriaEntity,

    ],
    subscribers: [],
    migrations: []
}

export const AppDataSource = new DataSource(options)

/**
 * Estrutura
 * 
 * Familia
 *      Integrante
 *          Conta
 *          Categoria
 * DataRef
 *      Movimento
 *          MovimentoCredito
 *          MovimentoRepasse
 *      SaldoConta
 *      SaldoCategoria
 *      SaldoRepasse
 *      Repasse
 */