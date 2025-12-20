import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import express, { Application } from "express"
import AuthController from "./controllers/AuthController"
import CadastroController from "./controllers/CadastroController"
import ConfigController from "./controllers/ConfigController"
import FamiliaController from "./controllers/FamiliaController"
import LoginController from "./controllers/LoginController"
import { AppDataSource } from "./database/data-source"

class AppBootstrap {
    app: Application

    constructor() {
        dotenv.config()
        this.app = express()
        this.app.use(cookieParser(process.env.COOKIE_SECRET))
        this.app.use(express.json())
    }

    initializeControllers() {
        new FamiliaController(this.app)
        new CadastroController(this.app)
        new LoginController(this.app)
        new AuthController(this.app)
        new ConfigController(this.app)
    }

    async initializeApp(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app.listen(3000, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })
    }
}

const bootstrap = async () => {
    try {
        await AppDataSource.initialize()
    } catch (error) {
        console.error('⚠️ Falha na conexão com o banco de dados', error)
        process.exit(1)
    }

    try {
        const app = new AppBootstrap()
        app.initializeControllers()
        await app.initializeApp()
    } catch (error) {
        console.error('⚠️ Falha ao iniciar a aplicação', error)
        process.exit(1)
    }

    console.log("🚀 Rodando em http://localhost:3000")

    await teste()
}

const teste = async () => {

    // console.clear()
    // const repo = AppDataSource.getRepository(CategoriaEntity)
    // const ct = await repo.findOneBy({ id: 7 })
    // console.log(ct)

    // const repoMvDetalhe = AppDataSource.getRepository(MvDetalheEntity)
    // const mvDetalhe = await repoMvDetalhe.findOneBy({ id: 2 })
    // console.log(mvDetalhe)

    // const newMvDetalhe = repoMvDetalhe.create({
    //     dia: 19,
    //     descricao: 'teste3',
    //     valor: 30,
    //     idMv: 90,
    //     mv: {
    //         id: 1
    //     },
    //     categoria: {
    //         id: 7
    //     },
    //     conta: {
    //         id: 1
    //     }
    // })
    // const y = await repoMvDetalhe.save(newMvDetalhe)
    // console.log('new', y)
}

bootstrap()
