import { Request } from "express";
import { Repository } from "typeorm";
import FamiliaEntity from "../domain/entities/FamiliaEntity";
import FamiliaModel from "../domain/models/FamiliaModel";

export default class FamiliaService {

    model: FamiliaModel
    isModelValid: boolean = false
    repository: Repository<FamiliaEntity>

    constructor(req: Request, repository: Repository<FamiliaEntity>) {
        this.model = new FamiliaModel()
        this.isModelValid = this.model.fromBody(req.body)
        this.repository = repository
    }

    async add(): Promise<void> {
        this.model.id = 0
        const entity = new FamiliaEntity(this.model)
        const result = await this.repository.save(entity)
        this.model.fromEntity(result)
    }
}

