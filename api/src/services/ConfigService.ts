import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import FamiliaEntity from "../domain/entities/FamiliaEntity";

export default class ConfigService {
    private get familiaRepository(): Repository<FamiliaEntity> {
        return AppDataSource.getRepository(FamiliaEntity)
    }

    public obterFamilia(id: number): Promise<FamiliaEntity | null> {
        return this.familiaRepository.findOne({
            where: { id },
            relations: {
                integrantes: true
            },
            loadEagerRelations: true
        })
    }
}