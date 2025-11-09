import express from "express"
import { AppDataSource } from "./database/data-source"
import router from "./routes"

const initializeApp = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const app = express()
        app.use(express.json())
        app.use('/api', router)
        app.listen(3000, (error) => {
            if (error)
                reject(error)
            else
                resolve()
        })
    })
}

const bootstrap = async () => {
    try {
        await AppDataSource.initialize()
    } catch (error) {
        console.error('⚠️ Falha na conexão com o banco de dados', error)
        process.exit(1)
    }

    try {
        await initializeApp()
    } catch (error) {
        console.error('⚠️ Falha ao iniciar a aplicação', error)
        process.exit(1)
    }

    console.log("🚀 Rodando em http://localhost:3000")
}

bootstrap()
