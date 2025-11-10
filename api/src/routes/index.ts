import { Router } from "express";
import { getAccounts } from "../controllers/accountController";
import { obterFamilias } from "../controllers/familiaController";

const router = Router()
const userRoute = '/usuarios'
const accountRoute = '/contas'

// Users
router.get(userRoute, obterFamilias)

// Accounts
router.get(accountRoute, getAccounts)

export default router
