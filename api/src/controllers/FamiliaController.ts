import { Application, Request, Response } from "express";
import FamiliaModel from "../domain/models/FamiliaModel";
import FamiliaService from "../services/FamiliaService";
import ControllerBase from "./ControllerBase";

class FamiliaController extends ControllerBase<FamiliaService> {

    constructor(app: Application) {
        super(app, FamiliaService)

        this.router.get('/familia', this.get)
        this.router.post('/familia', this.post)

        this.registerRoutes()
    }

    get = async (_req: Request, res: Response<FamiliaModel[]>) => {
        const result = await this.service.getData()
        return res.json(result)
    }

    post = async (req: Request<unknown, FamiliaModel[], FamiliaModel[]>, res: Response<FamiliaModel[]>) => {
        const result = await this.service.syncData(req.body)
        return res.json(result)
    }
}

export default FamiliaController