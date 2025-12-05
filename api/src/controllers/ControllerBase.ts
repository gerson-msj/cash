import { Application, Response, Router } from "express"
import IAuth from "../domain/auth"
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

    protected unauthorized(res: Response<IErro>) {
        return res.status(401).json({ message: 'Não autorizado' })
    }

    protected OkEmpty(res: Response) {
        return res.status(204).send()
    }

    protected auth(signedCookies: Record<string, string>): IAuth | undefined {
        const authCookie = signedCookies['auth']
        if (!authCookie) {
            return undefined
        }

        return JSON.parse(atob(authCookie)) as IAuth
    }

}

export default ControllerBase