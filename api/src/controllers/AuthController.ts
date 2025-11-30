import { Application, Request, Response } from "express";
import IAuth from "../domain/auth";
import AuthService from "../services/AuthService";
import ControllerBase from "./ControllerBase";

export default class AuthController extends ControllerBase<AuthService> {

    constructor(app: Application) {
        super(app, AuthService)
        this.router.get('/auth', this.get)
        this.registerRoutes()
    }

    get = async (req: Request, resp: Response) => {

        let auth: IAuth | undefined = undefined

        const authCookie = req.signedCookies.auth
        if (!authCookie) {
            return resp.json(auth)
        }

        auth = JSON.parse(atob(authCookie)) as IAuth

        return resp.json(auth)
    }
}