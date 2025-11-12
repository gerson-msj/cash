import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import FamiliaEntity from "../domain/entities/FamiliaEntity";
import FamiliaModel from "../domain/models/FamiliaModel";

export default class FamiliaService {

    repository: Repository<FamiliaEntity>

    constructor() {
        this.repository = AppDataSource.getRepository(FamiliaEntity)
    }

    async getData(): Promise<FamiliaModel[]> {
        const entities = await this.repository.find()
        const models = entities.map<FamiliaModel>(e => {
            return { ...e }
        })
        return models
    }

    async syncData(data: string): Promise<FamiliaModel[]> {

        const models = JSON.parse(data) as FamiliaModel[]

        const creates = models.filter(m => m.id == 0 && !m.remove)
        const updates = models.filter(m => m.id > 0 && !m.remove)
        const modelsToSave = [...creates, ...updates]
        const modelsToRemove = models.filter(m => m.id > 0 && m.remove)
        const entitiesToSave = this.repository.create(modelsToSave)
        const entitiesToRemove = this.repository.create(modelsToRemove)

        const result = await AppDataSource.transaction(async manager => {
            const savedEntities = await manager.save(entitiesToSave)
            const removedEntities = await manager.remove(entitiesToRemove)
            return [
                ...savedEntities.map<FamiliaModel>(e => {
                    return { ...e, remove: false }
                }),
                ...removedEntities.map<FamiliaModel>(e => {
                    return { ...e, remove: true }
                })
            ]
        })

        return result
    }
}

