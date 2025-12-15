import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import CategoriaEntity from "../domain/entities/categoria";
import ContaEntity from "../domain/entities/conta";
import FamiliaEntity, { IFamilia } from "../domain/entities/familia";
import IntegranteEntity from "../domain/entities/integrante";

export default class ConfigService {

    private get familiaRepository(): Repository<FamiliaEntity> {
        return AppDataSource.getRepository(FamiliaEntity)
    }

    private get integranteRepository() {
        return AppDataSource.getRepository(IntegranteEntity)
    }

    private get categoriaRepository() {
        return AppDataSource.getRepository(CategoriaEntity)
    }

    private get contaRepository() {
        return AppDataSource.getRepository(ContaEntity)
    }


    public obterFamilia(id: number): Promise<IFamilia | null> {
        return this.familiaRepository.findOne({
            where: { id },
            relations: {
                integrantes: true
            },
            loadEagerRelations: true
        })
    }

    public async salvar(model: IFamilia): Promise<IFamilia> {

        model.integrantes = (model.integrantes ?? [])
            .filter(({ remove }) => !remove)

        model.integrantes.forEach(integrante => {
            integrante.categorias = (integrante.categorias ?? [])
                .filter(({ remove }) => !remove)

            integrante.contas = (integrante.contas ?? [])
                .filter(({ remove }) => !remove)
        });

        const familia = this.familiaRepository.create(model)

        familia.integrantes?.forEach(integrante => {
            if (integrante.id !== undefined) {
                delete integrante.senha
            }
        })

        const result = await AppDataSource.transaction(async manager => {
            const saved = await manager.save(familia)
            return saved
        })

        return result
    }
}