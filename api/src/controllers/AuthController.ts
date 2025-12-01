import { Application, Request, Response } from "express";
import AuthService from "../services/AuthService";
import ControllerBase from "./ControllerBase";

export default class AuthController extends ControllerBase<AuthService> {

    constructor(app: Application) {
        super(app, AuthService)
        this.router.get('/auth', this.get)
        this.registerRoutes()
    }

    get = async (req: Request, res: Response) => {
        try {
            const auth = this.auth(req);
            if (!auth) {
                return this.OkEmpty(res)
            }

            return res.json(auth)
        } catch (error) {
            console.log(error)
            res.clearCookie("auth", {
                httpOnly: true,
                sameSite: "lax",
                signed: true
            });
            return this.OkEmpty(res)
        }
    }
}