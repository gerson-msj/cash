import { Application, Request, Response } from "express";
import { ICadastro } from "../domain/types/ICadastro";
import IErro from "../domain/types/IErro";
import { ITokenPayload } from "../domain/types/ITokenPayload";
import CadastroService from "../services/CadastroService";
import ControllerBase from "./ControllerBase";

class CadastroController extends ControllerBase<CadastroService> {

    constructor(app: Application) {
        super(app, CadastroService)

        this.router.post('/cadastro', this.post)

        this.registerRoutes()
    }

    post = async (req: Request<unknown, ITokenPayload | IErro, ICadastro>, res: Response<ITokenPayload | IErro>) => {
        const integranteExistente = await this.service.integranteExistente(req.body.email)

        if (integranteExistente) {
            return res.status(400).json({ message: "O email informado já está em uso." })
        }

        try {
            const familiaCadastrada = await this.service.cadastrar(req.body)
            return res.json({
                idIntegrante: familiaCadastrada.integrantes![0].id!,
                idFamilia: familiaCadastrada.id!,
                nome: req.body.nome,
                familia: req.body.familia,
                principal: true
            })
        } catch (error) {
            console.error("CadastroController.Post", error)
            return res.status(500).json({ message: "Houve uma falha interna ao realizar o cadastro" })
        }
    }

}

export default CadastroController