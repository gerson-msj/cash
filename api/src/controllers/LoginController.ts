import { Application } from "express";
import IAuth from "../domain/types/IAuth";
import IErro from "../domain/types/IErro";
import ILogin from "../domain/types/ILogin";
import LoginService from "../services/LoginService";
import ControllerBase from "./ControllerBase";

class LoginController extends ControllerBase<LoginService> {
    /**
     *
     */
    constructor(app: Application) {
        super(app, LoginService)
        this.router.post('/login', this.post)
        this.registerRoutes()
    }

    post = async (req: Request<unknown, IAuth | IErro, ILogin>, res: Response<IAuth | IErro>) => {

    }
}