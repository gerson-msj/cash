import { Application, Router } from "express"

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


}

export default ControllerBase