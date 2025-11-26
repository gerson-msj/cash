import { Application, Request, Response } from "express";
import { IAuth } from "../domain/types/IAuth";
import { ICadastro } from "../domain/types/ICadastro";
import IErro from "../domain/types/IErro";
import CadastroService from "../services/CadastroService";
import ControllerBase from "./ControllerBase";

class CadastroController extends ControllerBase<CadastroService> {

    constructor(app: Application) {
        super(app, CadastroService)

        this.router.post('/cadastro', this.post)

        this.registerRoutes()
    }

    post = async (req: Request<unknown, IAuth | IErro, ICadastro>, res: Response<IAuth | IErro>) => {
        const integranteExistente = await this.service.integranteExistente(req.body.email)

        if (integranteExistente) {
            return res.status(400).json({ message: "O email informado já está em uso." })
        }

        try {
            const familiaCadastrada = await this.service.cadastrar(req.body)
            const auth: IAuth = {
                idIntegrante: familiaCadastrada.integrantes![0].id!,
                idFamilia: familiaCadastrada.id!,
                nome: req.body.nome,
                familia: req.body.familia,
                principal: true
            }

            res.cookie("auth", auth, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 90 * 24 * 60 * 60 * 1000,
            })

            return res.json(auth)
        } catch (error) {
            console.error("CadastroController.Post", error)
            return res.status(500).json({ message: "Houve uma falha interna ao realizar o cadastro" })
        }
    }

}

export default CadastroController