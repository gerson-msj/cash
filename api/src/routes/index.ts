import { getUsers } from "../controllers/userController";
import { getAccounts } from "../controllers/accountController";
import { Router } from "express";

const router = Router()
const userRoute = '/usuarios'
const accountRoute = '/contas'

// Users
router.get(userRoute, getUsers)

// Accounts
router.get(accountRoute, getAccounts)

export default router
