import { Application, Request, Response } from "express";
import FamiliaEntity from "../domain/entities/FamiliaEntity";
import IErro from "../domain/erro";
import ConfigService from "../services/ConfigService";
import ControllerBase from "./ControllerBase";

export default class ConfigController extends ControllerBase<ConfigService> {

    constructor(app: Application) {
        super(app, ConfigService);
        this.router.get('/config', this.get)
        this.registerRoutes()
    }

    get = async (req: Request, res: Response<FamiliaEntity | IErro>) => {
        const auth = this.auth(req)
        if (!auth)
            return this.unauthorized(res)

        const familia = await this.service.obterFamilia(auth.idFamilia)
        if (!familia) {
            return this.badRequest(res, "Família não localizada.")
        }

        familia.integrantes?.forEach(i => delete i.senha)

        return familia
            ? res.json(familia)
            : this.badRequest(res, "Família não localizada.")
    }
}