import { Application, Response, Router } from "express"
import IErro from "../domain/erro"

abstract class ControllerBase<TService> {
    protected service: TService
    protected router: Router
    private app: Application

    constructor(app: Application, serviceClass: new () => TService) {
        this.app = app
        this.service = new serviceClass()
        this.router = Router()
    }

    protected registerRoutes() {
        this.app.use('/api', this.router)
    }

    protected badRequest(res: Response<IErro>, message: string) {
        return res.status(400).json({ message: message })
    }

    protected serverError(res: Response<IErro>, message: string) {
        return res.status(500).json({ message: message })
    }

    protected OkEmpty(res: Response) {
        return res.status(204).send()
    }

}

export default ControllerBase