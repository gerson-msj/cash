import { Application, Request, Response } from "express";
import IAuth from "../domain/auth";
import IErro from "../domain/erro";
import ILogin from "../domain/login";
import LoginService from "../services/LoginService";
import ControllerBase from "./ControllerBase";

export default class LoginController extends ControllerBase<LoginService> {

    constructor(app: Application) {
        super(app, LoginService)
        this.router.post('/login', this.post)
        this.router.delete('/login', this.delete)
        this.registerRoutes()
    }

    post = async (req: Request<unknown, IAuth | IErro, ILogin>, res: Response<IAuth | IErro>) => {
        const integrante = await this.service.obTerIntegrante(req.body.email)

        if (!integrante) {
            return this.badRequest(res, 'Usuário não localizado.')
        }

        if (integrante.senha !== req.body.senha) {
            return this.badRequest(res, 'Senha inválida.')
        }

        const auth: IAuth = {
            idIntegrante: integrante.id!,
            idFamilia: integrante.familia!.id!,
            nome: integrante.nome,
            familia: integrante.familia!.nome,
            principal: integrante.principal
        }

        res.cookie("auth", btoa(JSON.stringify(auth)), {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            signed: true,
            maxAge: 90 * 24 * 60 * 60 * 1000,
        })

        return res.json(auth)
    }

    delete = async (req: Request, res: Response) => {
        res.clearCookie("auth", {
            httpOnly: true,
            sameSite: "lax",
            signed: true
        });

        return this.OkEmpty(res)
    }
}

