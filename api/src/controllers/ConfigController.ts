import { Application, Request, Response } from "express";
import { IFamilia } from "../domain/entities/familia";
import IErro from "../domain/erro";
import ConfigService from "../services/ConfigService";
import ControllerBase from "./ControllerBase";

export default class ConfigController extends ControllerBase<ConfigService> {

    constructor(app: Application) {
        super(app, ConfigService);
        this.router.get('/config', this.get)
        this.router.post('/config', this.post)
        this.registerRoutes()
    }

    get = async (req: Request, res: Response<IFamilia | IErro>) => {
        const auth = this.auth(req.signedCookies)
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

    post = async (req: Request<unknown, IFamilia, IFamilia>, res: Response<IFamilia | IErro>) => {
        const auth = this.auth(req.signedCookies)
        if (!auth)
            return this.unauthorized(res)

        const model = req.body
        model.id = auth.idFamilia

        try {
            const result = await this.service.salvar(model)
            return res.json(result)
        } catch (error) {
            console.log(error)
            return this.serverError(res, "Erro ao salvar alterações.")
        }

    }
}