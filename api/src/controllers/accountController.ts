import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/Integrante";

const repository = AppDataSource.getRepository(User)

export const getAccounts = async (_req: Request, res: Response) => {
    const users = await repository.find()
    return res.json(users)
}