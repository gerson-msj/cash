import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Familia from "../domain/entities/Familia";

const repository = AppDataSource.getRepository(Familia)

export const obterFamilias = async (_req: Request, res: Response) => {
    const familias = await repository.find()
    return res.json(familias)
}

export const postUser = async (req: Request, res: Response) => {

}