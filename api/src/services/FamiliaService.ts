import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import FamiliaEntity from "../domain/entities/FamiliaEntity";
import FamiliaModel from "../domain/models/FamiliaModel";

export default class FamiliaService {

    public get repository(): Repository<FamiliaEntity> {
        return AppDataSource.getRepository(FamiliaEntity)
    }

    async getData(): Promise<FamiliaModel[]> {

        const entities = await this.repository.find()
        const models = entities.map<FamiliaModel>(e => {
            return { ...e }
        })
        return models
    }

    async syncData(models: FamiliaModel[]): Promise<FamiliaModel[]> {

        /** ### Modelos para **upsert**
         * - Não marcados para remoção.
         * - Ids zerados são substituidos por undefined.
         */
        const modelsToSave = models.filter(m => !m.remove)
            .map(m => ({ ...m, id: m.id == 0 ? undefined : m.id }))

        /** ### Modelos para **remoção**
         * - Marcados para remoção.
         * - Devem possuir Id não nulo ou zerado
         */
        const modelsToRemove = models.filter(m => m.remove && (m.id ?? 0) > 0)
            .map(m => ({ ...m }))

        const entitiesToSave = this.repository.create(modelsToSave)
        const entitiesToRemove = this.repository.create(modelsToRemove)

        const result = await AppDataSource.transaction(async manager => {

            const savedEntities = await manager.save(entitiesToSave)
            const removedEntities = await manager.remove(entitiesToRemove)
            return [
                ...savedEntities.map<FamiliaModel>(e => {
                    return { ...e }
                }),
                ...removedEntities.map<FamiliaModel>(e => {
                    return { ...e, remove: true }
                })
            ]
        })

        return result
    }
}

