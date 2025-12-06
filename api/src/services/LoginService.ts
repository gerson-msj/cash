import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import IntegranteEntity from "../domain/entities/integrante";

export default class LoginService {
    private get integranteRepository(): Repository<IntegranteEntity> {
        return AppDataSource.getRepository(IntegranteEntity)
    }

    async obTerIntegrante(email: string): Promise<IntegranteEntity | null> {
        return this.integranteRepository.findOne({
            where: { email },
            relations: {
                familia: true
            },
            loadEagerRelations: false
        })
    }
}