import { Router } from "express";
import FamiliaController from "../controllers/FamiliaController";

const router = Router()
const familiaRoute = '/familia'
const accountRoute = '/contas'

const familiaController = new FamiliaController()

router.get(familiaRoute, familiaController.get)

export default router
