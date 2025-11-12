import express, { Application } from "express"
import FamiliaController from "./controllers/FamiliaController"
import { AppDataSource } from "./database/data-source"

class AppBootstrap {
    app: Application

    constructor() {
        this.app = express()
        this.app.use(express.json())
    }

    initializeControllers() {
        new FamiliaController(this.app)
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
}

bootstrap()