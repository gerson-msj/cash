import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import FamiliaEntity from "../domain/entities/FamiliaEntity";
import FamiliaService from "../services/familiaService";

const repository = AppDataSource.getRepository(FamiliaEntity)

export const get = async (_req: Request, res: Response) => {
    const familias = await repository.find()
    return res.json(familias)
}

export const post = async (req: Request, res: Response) => {
    const service = new FamiliaService(req, repository)

    if (!service.isModelValid)
        return res.status(400).send({ message: 'Dados inválidos.' })

    try {
        await service.add()
        return res.status(200).send(JSON.stringify(service.model))
    } catch (error) {
        console.error('Falha ao incluir familia:', error)
        return res.status(500).send({ message: 'Nâo foi possível completar a operação' })
    }
}

// export const patch = async (req: Request, res: Response) => {
//     const data = JSON.parse(req.body) as IFamiliaModel
// }