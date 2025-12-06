import { Application, Request, Response } from "express";
import { IFamilia } from "../domain/entities/familia";
import FamiliaService from "../services/FamiliaService";
import ControllerBase from "./ControllerBase";

class FamiliaController extends ControllerBase<FamiliaService> {

    constructor(app: Application) {
        super(app, FamiliaService)

        this.router.get('/familia', this.get)
        this.router.post('/familia', this.post)

        this.registerRoutes()
    }

    get = async (_req: Request, res: Response<IFamilia[]>) => {
        const result = await this.service.getData()
        return res.json(result)
    }

    post = async (req: Request<unknown, IFamilia[], IFamilia[]>, res: Response<IFamilia[]>) => {
        const result = await this.service.syncData(req.body)
        return res.json(result)
    }
}

export default FamiliaController