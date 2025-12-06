import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import FamiliaEntity, { IFamilia } from "../domain/entities/familia";

export default class ConfigService {
    private get familiaRepository(): Repository<FamiliaEntity> {
        return AppDataSource.getRepository(FamiliaEntity)
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

        const familia = this.familiaRepository.create(model)
        delete model.integrantes

        const result = await AppDataSource.transaction(async manager => {
            const saved = await manager.save(familia)
            return saved
        })

        return result
    }
}